import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-a_sVHxx-4CpMdww6WgiePlmVSDK1aY0",
  authDomain: "codemoon-a54c6.firebaseapp.com",
  projectId: "codemoon-a54c6",
  storageBucket: "codemoon-a54c6.appspot.com",
  messagingSenderId: "558873765280",
  appId: "1:558873765280:web:19fff80f90faf785aef0c5",
  measurementId: "G-GZ3LQXD8NX"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);