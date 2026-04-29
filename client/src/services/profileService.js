import apiClient from "./apiClient.js";

/**
 * API Service for User Profile
 */

export const getProfile = async () => {
  try {
    const response = await apiClient.get("profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await apiClient.put("profile", profileData);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
