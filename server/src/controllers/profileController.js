import Profile from "../models/Profile.js";

/**
 * Get user profile
 * @route GET /api/profile
 */
export const getProfile = async (req, res) => {
  try {
    // For MVP, we'll just get the first profile (single user)
    let profile = await Profile.findOne();

    if (!profile) {
      // Return default profile if none exists
      return res.status(200).json({
        _id: null,
        name: "",
        email: "",
        phone: "",
      });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

/**
 * Update user profile
 * @route PUT /api/profile
 */
export const updateProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find existing profile or create a new one
    let profile = await Profile.findOne();

    if (profile) {
      // Update existing profile
      profile.name = name;
      profile.email = email;
      profile.phone = phone;
      await profile.save();
    } else {
      // Create new profile if doesn't exist
      profile = new Profile({
        name,
        email,
        phone,
      });
      await profile.save();
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};
