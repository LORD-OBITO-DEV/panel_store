import Panel from "../models/Panel.js";
import { deletePteroServer } from "../utils/pteroDelete.js"; // optional helper to delete server from Pterodactyl

export const autoDeletePanels = async () => {
  try {
    const now = new Date();
    const expired = await Panel.find({ expiresAt: { $lte: now }, status: { $ne: "deleted" } });

    for (const panel of expired) {
      console.log("Auto-deleting panel:", panel._id, panel.username);
      // optionally call ptero to remove server if pteroServer exists
      if (panel.pteroServer && panel.pteroServer.attributes?.id) {
        try {
          await deletePteroServer(panel.pteroServer.attributes.id);
        } catch (e) {
          console.warn("Failed to delete remote ptero server:", e.message || e);
        }
      }
      panel.status = "deleted";
      await panel.save();
      // optionally remove DB entry: await Panel.deleteOne({ _id: panel._id });
    }
  } catch (err) {
    console.error("autoDeletePanels error:", err);
  }
};
