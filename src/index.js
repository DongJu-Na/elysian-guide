"use client"

import { useState } from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import SplashScreen from "./component/SplashScreen"
import reportWebVitals from "./reportWebVitals"

function Root() {
  const [showSplash, setShowSplash] = useState(true)

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  return <>{showSplash ? <SplashScreen onComplete={handleSplashComplete} /> : <App />}</>
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<Root />)

reportWebVitals()

