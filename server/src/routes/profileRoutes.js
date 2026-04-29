import express from "express";
import {
  getProfile,
  updateProfile,
} from "../controllers/profileController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(requireAuth);

/**
 * Profile Routes
 * GET /api/profile  - Get user profile
 * PUT /api/profile  - Update user profile
 */

router.get("/", getProfile);
router.put("/", updateProfile);

export default router;
