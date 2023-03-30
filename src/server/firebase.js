import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdam3zQTEyHZvHexla4PaQA6tSuTfBh64",
  authDomain: "chat-app-898e3.firebaseapp.com",
  projectId: "chat-app-898e3",
  storageBucket: "chat-app-898e3.appspot.com",
  messagingSenderId: "326637933697",
  appId: "1:326637933697:web:61e833958d20c0acd96980"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth() 
export const storage = getStorage();
export const db =  getFirestore()