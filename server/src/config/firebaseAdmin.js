import { readFileSync, existsSync } from "node:fs";
import admin from "firebase-admin";

/**
 * Load service account object: inline JSON string, or path to the downloaded .json key file.
 */
function loadServiceAccountFromValue(raw) {
  const trimmed = String(raw).trim();
  if (trimmed.startsWith("{")) {
    return JSON.parse(trimmed);
  }
  if (existsSync(trimmed)) {
    return JSON.parse(readFileSync(trimmed, "utf8"));
  }
  throw new Error(
    "Value must be valid JSON (starting with {) or an existing path to the service account .json file."
  );
}

function loadServiceAccountFromPath(path) {
  const trimmed = String(path).trim();
  if (!existsSync(trimmed)) {
    throw new Error(`Service account file not found: ${trimmed}`);
  }
  return JSON.parse(readFileSync(trimmed, "utf8"));
}

/**
 * Initialize Firebase Admin with a service account key file only (credential.cert).
 * Does not use Application Default Credentials, so the wrong GCP project (e.g. gcloud default)
 * cannot be picked up accidentally. The key must belong to the same Firebase project as the
 * web client (e.g. jobhelper-19a89) or verifyIdToken will fail with an audience mismatch.
 *
 * Set one of:
 * - FIREBASE_SERVICE_ACCOUNT — inline JSON (one line) OR absolute path to *-firebase-adminsdk-*.json
 * - GOOGLE_APPLICATION_CREDENTIALS — absolute path to the same JSON (read with cert(), not ADC)
 */
if (!admin.apps.length) {
  const fromEnv = process.env.FIREBASE_SERVICE_ACCOUNT?.trim();
  const gacPath = process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim();
  const expectedProject = process.env.FIREBASE_PROJECT_ID?.trim();

  let parsed;
  let source;
  if (fromEnv) {
    parsed = loadServiceAccountFromValue(fromEnv);
    source = "FIREBASE_SERVICE_ACCOUNT";
  } else if (gacPath) {
    parsed = loadServiceAccountFromPath(gacPath);
    source = "GOOGLE_APPLICATION_CREDENTIALS";
  } else {
    throw new Error(
      "[firebase-admin] Missing credentials. Set FIREBASE_SERVICE_ACCOUNT (path to JSON or inline JSON) " +
        "or GOOGLE_APPLICATION_CREDENTIALS (path to JSON) to the service account key from the **same** " +
        "Firebase project as the client (e.g. jobhelper-19a89). Application Default Credentials are not used."
    );
  }

  if (expectedProject && parsed.project_id !== expectedProject) {
    console.warn(
      `[firebase-admin] FIREBASE_PROJECT_ID (${expectedProject}) does not match project_id in the key file (${parsed.project_id}). ID tokens must match the key file project.`
    );
  }

  admin.initializeApp({
    credential: admin.credential.cert(parsed),
  });
  console.log(
    `[firebase-admin] Initialized via ${source}, project_id: ${parsed.project_id} (this must match the web app Firebase project)`
  );
}

export default admin;
