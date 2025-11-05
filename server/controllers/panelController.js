import Panel from "../models/Panel.js";

/**
 * Create provisional panel entry in DB (status=pending)
 * The real Pterodactyl server will be created after payment verification (PayPal capture)
 */
export const createPanelController = async (req, res) => {
  try {
    const { username, password, email, plan, duration, ram, cpu, disk, price } = req.body;

    // validation minimal
    if (!username || !password || !email || !plan) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const panel = new Panel({
      type: plan,
      ownerEmail: email,
      username,
      password,
      ram,
      cpu,
      disk,
      price,
      duration,
      status: "pending"
    });

    await panel.save();

    return res.json({ success: true, panelId: panel._id });
  } catch (err) {
    console.error("createPanelController:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const listPanelsController = async (req, res) => {
  try {
    const { type } = req.query;
    const filter = {};
    if (type) filter.type = type;
    const panels = await Panel.find(filter).select("-password").sort({ createdAt: -1 }).lean();
    res.json({ success: true, panels });
  } catch (err) {
    console.error("listPanelsController:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
