import Job from "../models/Job.js";
import Profile from "../models/Profile.js";

/**
 * Delete all app data for an anonymous (guest) Firebase session only.
 * @route DELETE /api/user/guest-data
 */
export const purgeGuestData = async (req, res) => {
  try {
    if (req.user.signInProvider !== "anonymous") {
      return res.status(403).json({
        message: "Only guest sessions can be cleared this way",
      });
    }

    const uid = req.user.uid;
    const [jobsResult, profileResult] = await Promise.all([
      Job.deleteMany({ userId: uid }),
      Profile.deleteOne({ userId: uid }),
    ]);

    res.status(200).json({
      deleted: true,
      jobsDeleted: jobsResult.deletedCount ?? 0,
      profileDeleted: profileResult.deletedCount > 0,
    });
  } catch (error) {
    console.error("Error purging guest data:", error);
    res.status(500).json({ message: "Failed to clear guest data" });
  }
};
