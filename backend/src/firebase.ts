import admin from "firebase-admin";
import fs from "fs";
import dotenv from "dotenv";
import { FIREBASE_PROJECT_ID } from "./env.js";

dotenv.config();

const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

if (!admin.apps.length) {
  if (serviceAccountJson) {
    // Option A: Inline JSON
    const svc = JSON.parse(serviceAccountJson);
    admin.initializeApp({
      credential: admin.credential.cert(svc),
      projectId: FIREBASE_PROJECT_ID || svc.project_id,
    });
  } else if (serviceAccountPath) {
    // Option B: Load from file path
    const svc = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
    admin.initializeApp({
      credential: admin.credential.cert(svc),
      projectId: FIREBASE_PROJECT_ID || svc.project_id,
    });
  } else {
    // Option C: Default credentials (Google Cloud / Emulator)
    console.warn(
      "Firebase Admin initialized with application default credentials (ensure GOOGLE_APPLICATION_CREDENTIALS is set)."
    );
    admin.initializeApp();
  }
}

export const firebaseAuth = admin.auth();
