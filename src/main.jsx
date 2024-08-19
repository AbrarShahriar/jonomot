import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import "./main.scss";
import About from "./pages/About.jsx";
import Admin from "./pages/Admin.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "admin",
    element: <Admin />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
