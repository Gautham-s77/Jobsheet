import apiClient from "./apiClient.js";

/**
 * API Service for Message Generation
 */

export const generateMessage = async (jobId, contactName) => {
  try {
    const response = await apiClient.post("message/generate", {
      jobId,
      contactName,
    });
    return response.data.message;
  } catch (error) {
    console.error("Error generating message:", error);
    throw error;
  }
};
