import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./routes/HomePage";

// Router setup
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