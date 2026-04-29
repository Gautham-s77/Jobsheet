import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * API Service for Message Generation
 */

// Generate referral message
export const generateMessage = async (jobId, contactName) => {
  try {
    const response = await axios.post(`${API_URL}/message/generate`, {
      jobId,
      contactName,
    });
    return response.data.message;
  } catch (error) {
    console.error("Error generating message:", error);
    throw error;
  }
};
