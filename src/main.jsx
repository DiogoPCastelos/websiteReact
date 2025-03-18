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
