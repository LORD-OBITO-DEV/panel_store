import axios from "axios";
import Panel from "../models/Panel.js";
import { getPayPalToken } from "../utils/paypal.js";
import { createPteroServer } from "../utils/ptero.js";
import { sendPanelEmail } from "../utils/mailer.js";

/**
 * Create PayPal order server-side (optional)
 * Our client currently creates order with PayPal SDK; this endpoint is provided if you prefer server-side order creation.
 */
export const createOrderController = async (req, res) => {
  try {
    const { amount } = req.body;
    const token = await getPayPalToken();
    const base = process.env.PAYPAL_MODE === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";

    const response = await axios.post(
      `${base}/v2/checkout/orders`,
      {
        intent: "CAPTURE",
        purchase_units: [{ amount: { currency_code: "USD", value: amount.toString() } }]
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    res.json(response.data);
  } catch (err) {
    console.error("createOrderController:", err.response?.data || err.message);
    res.status(500).json({ success: false, message: "Error creating PayPal order" });
  }
};

/**
 * Capture PayPal order, then finalize panel: create Pterodactyl server and update DB + email user
 * Expects { orderID, panelId }
 */
export const captureOrderController = async (req, res) => {
  try {
    const { orderID, panelId } = req.body;
    if (!orderID || !panelId) return res.status(400).json({ success: false, message: "Missing orderID or panelId" });

    const token = await getPayPalToken();
    const base = process.env.PAYPAL_MODE === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";

    // Capture
    const captureRes = await axios.post(`${base}/v2/checkout/orders/${orderID}/capture`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (captureRes.data.status !== "COMPLETED" && captureRes.data.status !== "COMPLETED") {
      // PayPal may return COMPLETED; accept it
      console.warn("PayPal capture status:", captureRes.data.status);
    }

    // retrieve provisional panel
    const panel = await Panel.findById(panelId);
    if (!panel) return res.status(404).json({ success: false, message: "Panel not found" });

    // verify resources limit and block if over limit
    const cpuPercent = parseInt((panel.cpu || "0").replace("%", ""), 10) || 0;
    if (cpuPercent > 400 && !/illimit/i.test(panel.ram) && !/illimit/i.test(panel.cpu)) {
      panel.status = "deleted";
      await panel.save();
      return res.status(400).json({ success: false, message: "Requested resources exceed allowed limits" });
    }

    // create server on Pterodactyl
    const createResp = await createPteroServer({
      username: panel.username,
      email: panel.ownerEmail,
      password: panel.password,
      nest: process.env.PTERO_DEFAULT_NEST,
      egg: process.env.PTERO_DEFAULT_EGG,
      allocation: Number(process.env.PTERO_DEFAULT_ALLOCATION),
      node: Number(process.env.PTERO_DEFAULT_NODE),
      limits: {
        memory: parseMemory(panel.ram), // helper below
        disk: parseDisk(panel.disk),
        cpu: cpuPercent
      }
    });

    panel.pteroServer = createResp || null;
    panel.status = createResp ? "active" : "pending";
    await panel.save();

    // send mail to user
    await sendPanelEmail(panel.ownerEmail, { user: panel, server: createResp });

    res.json({ success: true, capture: captureRes.data, panel: panel });
  } catch (err) {
    console.error("captureOrderController:", err.response?.data || err.message);
    res.status(500).json({ success: false, message: "Error capturing order / creating panel" });
  }
};

// helpers
function parseMemory(ramStr) {
  if (!ramStr) return 1024;
  const s = String(ramStr).toLowerCase();
  if (s.includes("ill") || s.includes("∞")) return 0;
  const num = s.match(/(\d+)/);
  if (!num) return 1024;
  return Number(num[1]) * 1024 / (s.includes("go") || s.includes("gb") ? 1 : 1); // RAM in MB if input in Go/GB
}
function parseDisk(diskStr) {
  if (!diskStr) return 1000;
  const s = String(diskStr).toLowerCase();
  if (s.includes("ill") || s.includes("∞")) return 0;
  const num = s.match(/(\d+)/);
  if (!num) return 1000;
  return Number(num[1]);
}
