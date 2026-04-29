import Job from "../models/Job.js";
import Profile from "../models/Profile.js";
import { generateReferralMessage } from "../services/messageService.js";

/**
 * Generate referral message for a job (must belong to user; profile same user)
 * @route POST /api/message/generate
 * @body {jobId, contactName}
 */
export const generateMessage = async (req, res) => {
  try {
    const { jobId, contactName } = req.body;

    if (!jobId || !contactName) {
      return res.status(400).json({
        message: "Job ID and contact name are required",
      });
    }

    const job = await Job.findOne({ _id: jobId, userId: req.user.uid });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const profile = await Profile.findOne({ userId: req.user.uid });
    if (!profile) {
      return res.status(400).json({
        message: "User profile not found. Please set up your profile first.",
      });
    }

    const message = generateReferralMessage(job, profile, contactName);

    res.status(200).json({ message });
  } catch (error) {
    console.error("Error generating message:", error);
    res.status(500).json({ message: "Failed to generate message" });
  }
};
