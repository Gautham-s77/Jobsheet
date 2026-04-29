import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../services/profileService.js";

/**
 * Custom hook to manage user profile
 * Handles fetching and updating profile information
 */
export const useProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch profile
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await getProfile();
      setProfile(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const updateUserProfile = async (profileData) => {
    setLoading(true);
    try {
      const updatedProfile = await updateProfile(profileData);
      setProfile(updatedProfile);
      setError(null);
      return updatedProfile;
    } catch (err) {
      setError(err.message || "Failed to update profile");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch profile on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateUserProfile,
  };
};
