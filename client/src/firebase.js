import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUBgPcbKLdeWW2HgITZ74jw8cGt1mJ614",
  authDomain: "jobhelper-19a89.firebaseapp.com",
  projectId: "jobhelper-19a89",
  storageBucket: "jobhelper-19a89.firebasestorage.app",
  messagingSenderId: "1051626576348",
  appId: "1:1051626576348:web:d974dc34dc905af4709719",
  measurementId: "G-RTVWVTE3V3",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export { app, analytics };
