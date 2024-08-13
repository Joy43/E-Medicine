// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHObMcAODdOuuP4omGGA-LTbzONO7gYK4",
  authDomain: "emedicine-a1da0.firebaseapp.com",
  projectId: "emedicine-a1da0",
  storageBucket: "emedicine-a1da0.appspot.com",
  messagingSenderId: "610312212939",
  appId: "1:610312212939:web:3195b1c85309fc55e6664e",
  measurementId: "G-2FDWXTEYK4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app;