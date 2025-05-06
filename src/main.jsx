import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./routes/HomePage";

// Add the `basename` for deployment under /websiteReact
const router = createBrowserRouter(
  [{ path: "/", element: <HomePage /> }],
  { basename: "" } // This is where you set the base path
);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDN1QLdt2nfT8EiTeFwmOJbBWQGmGSFWhw",
  authDomain: "websitereact-cd7e9.firebaseapp.com",
  projectId: "websitereact-cd7e9",
  storageBucket: "websitereact-cd7e9.firebasestorage.app",
  messagingSenderId: "629387179127",
  appId: "1:629387179127:web:678483370ad04faa688272",
  measurementId: "G-7XD00JQPCT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

console.log(
  "Hi, why are you looking at the console? Nothing to see here! (hopefully?)\nHope you're having a great day! 😄"
);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister();
        console.log("Service worker unregistered");
      });
    })
    .catch((error) => {
      console.error("Error unregistering service workers:", error);
    });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
