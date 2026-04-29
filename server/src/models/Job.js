import mongoose from "mongoose";

/**
 * Job Schema
 * Represents a job application tracked by the user
 */
const jobSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      trim: true,
    },
    jobLink: {
      type: String,
      required: [true, "Job link is required"],
      trim: true,
    },
    source: {
      type: String,
      enum: ["LinkedIn", "Naukri", "Indeed", "Other"],
      required: [true, "Source is required"],
    },
    status: {
      type: String,
      enum: ["Saved", "Applied", "Referral Requested", "Interview", "Rejected"],
      default: "Saved",
    },
    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
