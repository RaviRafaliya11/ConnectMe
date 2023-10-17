import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwN2BIlQdxTHddLPxZ_LXLlmFOOrbPz8M",
  authDomain: "connectme-1b30a.firebaseapp.com",
  projectId: "connectme-1b30a",
  storageBucket: "connectme-1b30a.appspot.com",
  messagingSenderId: "80614725778",
  appId: "1:80614725778:web:57166108ce644c56762e4b",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
