import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";

import { ContextProvider } from "./contexts/ContextProvider.tsx";

const rootElement = document.getElementById("root");
if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <ContextProvider>
                <RouterProvider router={router} />
            </ContextProvider>
        </StrictMode>
    );
} else {
    console.error("Root element not found");
}
