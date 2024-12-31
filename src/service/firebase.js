import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCIXZBDzoY2xtYGmzSbu7umW78h6fEhSCY",
  authDomain: "clone-473e7.firebaseapp.com",
  projectId: "clone-473e7",
  storageBucket: "clone-473e7.firebasestorage.app",
  messagingSenderId: "810914465756",
  appId: "1:810914465756:web:30bf612dd86c4e0e54f119",
  measurementId: "G-593PTPL89H"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

