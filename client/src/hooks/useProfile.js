import { useState, useEffect, useCallback } from "react";
import { getProfile, updateProfile } from "../services/profileService.js";
import { useAuth } from "../context/AuthContext.jsx";

/**
 * Custom hook to manage user profile for the signed-in user
 */
export const useProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    if (!user) {
      setProfile({ name: "", email: "", phone: "" });
      setLoading(false);
      return;
    }
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
  }, [user]);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setProfile({ name: "", email: "", phone: "" });
      setError(null);
      setLoading(false);
      return;
    }
    fetchProfile();
  }, [user, authLoading, fetchProfile]);

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

  return {
    profile,
    loading: authLoading || loading,
    error,
    fetchProfile,
    updateUserProfile,
  };
};
