import Job from "../models/Job.js";

/**
 * Get all jobs for the authenticated user
 * @route GET /api/jobs
 */
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user.uid }).sort({
      createdAt: -1,
    });
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

/**
 * Create a new job
 * @route POST /api/jobs
 */
export const createJob = async (req, res) => {
  try {
    const { companyName, role, jobLink, source, status, notes } = req.body;

    if (!companyName || !role || !jobLink || !source) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newJob = new Job({
      userId: req.user.uid,
      companyName,
      role,
      jobLink,
      source,
      status: status || "Saved",
      notes: notes || "",
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ message: "Failed to create job" });
  }
};

/**
 * Update a job by ID (only if owned by user)
 * @route PUT /api/jobs/:id
 */
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { companyName, role, jobLink, source, status, notes } = req.body;

    const updatedJob = await Job.findOneAndUpdate(
      { _id: id, userId: req.user.uid },
      {
        companyName,
        role,
        jobLink,
        source,
        status,
        notes,
      },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ message: "Failed to update job" });
  }
};

/**
 * Delete a job by ID (only if owned by user)
 * @route DELETE /api/jobs/:id
 */
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedJob = await Job.findOneAndDelete({
      _id: id,
      userId: req.user.uid,
    });

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Failed to delete job" });
  }
};
