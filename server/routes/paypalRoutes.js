import express from "express";
import { createOrderController, captureOrderController } from "../controllers/paypalController.js";

const router = express.Router();

router.post("/create", createOrderController);
router.post("/capture", captureOrderController);

export default router;
