import express from "express";
import { generateMessage } from "../controllers/messageController.js";

const router = express.Router();

/**
 * Message Routes
 * POST /api/message/generate - Generate referral message
 */

router.post("/generate", generateMessage);

export default router;
