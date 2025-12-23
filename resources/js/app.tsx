//import './bootstrap';

import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import router from "./router";
import React from "react";

import "../css/app.css";

const container = document.getElementById("app");

if(container){
    createRoot(container!).render(
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}
