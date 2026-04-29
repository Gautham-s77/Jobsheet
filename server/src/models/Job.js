import mongoose from "mongoose";

/**
 * Job Schema
 * Represents a job application tracked by the user
 */
const jobSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "User ID is required"],
      index: true,
    },
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
      enum: [
        "LinkedIn",
        "Naukri",
        "Indeed",
        "Referral",
        "Company Site",
        "Other",
      ],
      required: [true, "Source is required"],
    },
    status: {
      type: String,
      enum: [
        "Saved",
        "Applied",
        "Referral Requested",
        "Interview",
        "Rejected",
      ],
      default: "Saved",
    },
    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
