import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./routes/HomePage";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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

const router = createBrowserRouter([{ path: "/", element: <HomePage /> }], {
  basename: "",
});

// Render
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <RouterProvider router={router} />
    </>
  </React.StrictMode>
);

console.log(
  "Hi, why are you looking at the console? Nothing to see here! (hopefully?)\nHope you're having a great day! 😄"
);
