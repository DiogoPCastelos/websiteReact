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

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((reg) => console.log("Service Worker registered!", reg))
      .catch((err) =>
        console.error("Service Worker registration failed:", err)
      );
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
