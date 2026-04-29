import Profile from "../models/Profile.js";

/**
 * Get user profile for the authenticated user
 * @route GET /api/profile
 */
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.uid });

    if (!profile) {
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
 * Create or update profile for the authenticated user
 * @route PUT /api/profile
 */
export const updateProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.uid },
      { userId: req.user.uid, name, email, phone },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    res.status(200).json(profile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};
