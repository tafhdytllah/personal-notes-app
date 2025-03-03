import App from "@/App";
import Providers from "@/providers";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>

      <Providers>
        <App />
      </Providers>
  </StrictMode>,
);
