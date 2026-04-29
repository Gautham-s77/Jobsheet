import Job from "../models/Job.js";
import Profile from "../models/Profile.js";
import { generateReferralMessage } from "../services/messageService.js";

/**
 * Generate referral message for a job
 * @route POST /api/message/generate
 * @body {jobId, contactName}
 */
export const generateMessage = async (req, res) => {
  try {
    const { jobId, contactName } = req.body;

    // Validate input
    if (!jobId || !contactName) {
      return res.status(400).json({
        message: "Job ID and contact name are required",
      });
    }

    // Fetch job details
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Fetch user profile
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(400).json({
        message: "User profile not found. Please set up your profile first.",
      });
    }

    // Generate message using template
    const message = generateReferralMessage(job, profile, contactName);

    res.status(200).json({ message });
  } catch (error) {
    console.error("Error generating message:", error);
    res.status(500).json({ message: "Failed to generate message" });
  }
};
