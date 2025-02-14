import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBAmuO10FSQIs6XVhHJrBjVK9bKAMCBH9Q",
  authDomain: "hack-a-ton-8603f.firebaseapp.com",
  databaseURL: "https://hack-a-ton-8603f-default-rtdb.firebaseio.com/",
  projectId: "hack-a-ton-8603f",
  storageBucket: "hack-a-ton-8603f.appspot.com",
  messagingSenderId: "1017515240679",
  appId: "1:1017515240679:android:1ef8b17e369b6fb0538642"
};

export  default  app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
