import express from "express";
import { purgeGuestData } from "../controllers/userController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(requireAuth);

router.delete("/guest-data", purgeGuestData);

export default router;
