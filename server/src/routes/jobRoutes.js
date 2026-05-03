import express from "express";
import multer from 'multer';
import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
  importJobs,
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

const upload = multer({ dest: 'uploads/' });

// The 'file' argument in upload.single() must match the field name sent from the frontend
router.post('/import', upload.single('file'), importJobs);

export default router;
