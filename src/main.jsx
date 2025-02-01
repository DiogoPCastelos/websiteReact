import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";
import HomePage from "./routes/HomePage";

// Add the `basename` for deployment under /websiteReact
const router = createBrowserRouter(
  [
    { path: "/", element: <HomePage /> },
    { path: "*", element: <Navigate to="/" replace /> }, // 🔄 Redirects properly
  ],
  { basename: "" }
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .catch((err) =>
        console.error("Service Worker registration failed:", err)
      );
    console.log(
      "What are you looking for? Stop looking at the console and just enjoy the website. Yes, image disposition is random in the projects section, yes it is made with react, yes it loads fast, yes the images are webp, yes it's pwa compliant, yes there are too many animations to count, yes most of them are on Math.random() timers, yes it even has a service worker.\n\n If you're a hiring manager, yes, you should hire me."
    );
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
