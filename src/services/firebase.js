import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_wr7l1H6VYxao4m8_p0w_DHboAKJgAk4",
  authDomain: "expensetraker-4f0fa.firebaseapp.com",
  projectId: "expensetraker-4f0fa",
  storageBucket: "expensetraker-4f0fa.firebasestorage.app",
  messagingSenderId: "930734393760",
  appId: "1:930734393760:web:370c31a17508b8502cfcc5",
  measurementId: "G-VRR0BM7LNL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);