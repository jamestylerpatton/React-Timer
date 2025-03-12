import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-[#1a2027]">
      <App />
    </main>
  </StrictMode>
)
