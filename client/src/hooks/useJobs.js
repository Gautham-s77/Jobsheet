import { useState, useEffect, useCallback } from "react";
import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} from "../services/jobService.js";
import { useAuth } from "../context/AuthContext.jsx";

/**
 * Custom hook to manage jobs for the signed-in user
 */
export const useJobs = () => {
  const { user, loading: authLoading } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = useCallback(async () => {
    if (!user) {
      setJobs([]);
      setLoading(false);
      return;
    }
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
  }, [user]);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setJobs([]);
      setError(null);
      setLoading(false);
      return;
    }
    fetchJobs();
  }, [user, authLoading, fetchJobs]);

  const addJob = async (jobData) => {
    try {
      const newJob = await createJob(jobData);
      setJobs((prev) => [newJob, ...prev]);
      setError(null);
      return newJob;
    } catch (err) {
      setError(err.message || "Failed to create job");
      throw err;
    }
  };

  const editJob = async (jobId, jobData) => {
    try {
      const updatedJob = await updateJob(jobId, jobData);
      setJobs((prev) =>
        prev.map((job) => (job._id === jobId ? updatedJob : job))
      );
      setError(null);
      return updatedJob;
    } catch (err) {
      setError(err.message || "Failed to update job");
      throw err;
    }
  };

  const removeJob = async (jobId) => {
    try {
      await deleteJob(jobId);
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to delete job");
      throw err;
    }
  };

  return {
    jobs,
    loading: authLoading || loading,
    error,
    fetchJobs,
    addJob,
    editJob,
    removeJob,
  };
};
