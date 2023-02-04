// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4bD2Kyi-WmilhXD5jZQEUVY0bq9ypZHw",
  authDomain: "vue-mombasa-ke.firebaseapp.com",
  projectId: "vue-mombasa-ke",
  storageBucket: "vue-mombasa-ke.appspot.com",
  messagingSenderId: "314329845421",
  appId: "1:314329845421:web:d90fb3e5cf0a8c7e240024"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()
export const githubProvider = new GithubAuthProvider()
export const storage = getStorage()
