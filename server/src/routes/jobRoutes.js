import express from "express";
import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(requireAuth);

/**
 * Job Routes
 * GET    /api/jobs      - Get all jobs
 * POST   /api/jobs      - Create a new job
 * PUT    /api/jobs/:id  - Update a job
 * DELETE /api/jobs/:id  - Delete a job
 */

router.get("/", getJobs);
router.post("/", createJob);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;
