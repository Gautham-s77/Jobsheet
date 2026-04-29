import { useState, useEffect } from "react";
import { getJobs, createJob, updateJob, deleteJob } from "../services/jobService.js";

/**
 * Custom hook to manage jobs
 * Handles fetching, creating, updating, and deleting jobs
 */
export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all jobs
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await getJobs();
      setJobs(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch jobs");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // Add new job
  const addJob = async (jobData) => {
    try {
      const newJob = await createJob(jobData);
      setJobs([newJob, ...jobs]);
      setError(null);
      return newJob;
    } catch (err) {
      setError(err.message || "Failed to create job");
      throw err;
    }
  };

  // Update existing job
  const editJob = async (jobId, jobData) => {
    try {
      const updatedJob = await updateJob(jobId, jobData);
      setJobs(jobs.map((job) => (job._id === jobId ? updatedJob : job)));
      setError(null);
      return updatedJob;
    } catch (err) {
      setError(err.message || "Failed to update job");
      throw err;
    }
  };

  // Remove job
  const removeJob = async (jobId) => {
    try {
      await deleteJob(jobId);
      setJobs(jobs.filter((job) => job._id !== jobId));
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to delete job");
      throw err;
    }
  };

  // Fetch jobs on mount
  useEffect(() => {
    fetchJobs();
  }, []);

  return {
    jobs,
    loading,
    error,
    fetchJobs,
    addJob,
    editJob,
    removeJob,
  };
};
