import admin from "../config/firebaseAdmin.js";

/**
 * Verifies Firebase ID token from Authorization: Bearer <token>
 * Attaches req.user = { uid, email }
 */
export const requireAuth = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const idToken = header.replace(/^Bearer\s+/i, "").trim().replace(/\s+/g, "");
  if (!idToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    req.user = {
      uid: decoded.uid,
      email: decoded.email || null,
      signInProvider: decoded.firebase?.sign_in_provider || null,
    };
    next();
  } catch (err) {
    console.error("Auth verify failed:", err.code || err.name, err.message);
    const body = { message: "Invalid or expired token" };
    if (process.env.NODE_ENV === "development" && err.code) {
      body.code = err.code;
    }
    return res.status(401).json(body);
  }
};
