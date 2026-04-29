import apiClient from "./apiClient.js";

/**
 * API Service for Jobs
 */

export const getJobs = async () => {
  try {
    const response = await apiClient.get("jobs");
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export const createJob = async (jobData) => {
  try {
    const response = await apiClient.post("jobs", jobData);
    return response.data;
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
};

export const updateJob = async (jobId, jobData) => {
  try {
    const response = await apiClient.put(`jobs/${jobId}`, jobData);
    return response.data;
  } catch (error) {
    console.error("Error updating job:", error);
    throw error;
  }
};

export const deleteJob = async (jobId) => {
  try {
    const response = await apiClient.delete(`jobs/${jobId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting job:", error);
    throw error;
  }
};
