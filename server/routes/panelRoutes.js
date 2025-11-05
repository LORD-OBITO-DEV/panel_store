import express from "express";
import { createPanelController, listPanelsController } from "../controllers/panelController.js";

const router = express.Router();

// create provisional panel (before payment) -> stores doc in Mongo as pending
router.post("/create", createPanelController);

// list panels (optionally by type)
router.get("/list", listPanelsController);

export default router;
