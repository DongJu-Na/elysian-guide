
"use client"

import { useEffect } from "react"
import "../style/SplashScreen.css"

function SplashScreen({ onComplete, duration = 5000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, duration)

    return () => clearTimeout(timer)
  }, [onComplete, duration])

  return (
    <div className="splash-screen">
      <div id="container">
        DESIGN YOUR
        <div id="flip">
          <div>
            <div>BEAUTIFULL</div>
          </div>
          <div>
            <div>LIFE</div>
          </div>
          <div>
            <div>HERE</div>
          </div>
        </div>
        IN ELYSIAN
      </div>
    </div>
  )
}

export default SplashScreen

