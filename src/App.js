"use client"

import { useState, useRef } from "react"
import "./App.css"
import { Play, Pause, MapPin, Info, Volume2 } from "lucide-react"

// Sample location data
const locationData = [
  {
    id: 1,
    name: "Central Park",
    description: "A large urban park in the heart of the city.",
    latitude: 40.785091,
    longitude: -73.968285,
    image: "/placeholder.svg?height=300&width=400",
    audio: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3",
  },
  {
    id: 2,
    name: "Brooklyn Bridge",
    description: "An iconic suspension bridge connecting Manhattan and Brooklyn.",
    latitude: 40.7061,
    longitude: -73.9969,
    image: "/placeholder.svg?height=300&width=400",
    audio: "https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3",
  },
  {
    id: 3,
    name: "Times Square",
    description: "Famous commercial intersection known for its bright lights and billboards.",
    latitude: 40.758,
    longitude: -73.9855,
    image: "/placeholder.svg?height=300&width=400",
    audio: "https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-621.mp3",
  },
]

function App() {
  const [selectedLocation, setSelectedLocation] = useState(locationData[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const handleLocationSelect = (location) => {
    setSelectedLocation(location)
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
      audioRef.current.src = location.audio
      audioRef.current.load()
    }
  }

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>ELYSIAN Location Guide</h1>
      </header>

      <div className="content-container">
        {/* Map container will be added by the user */}
        <div className="map-placeholder">
          <p>Your map will be displayed here</p>
        </div>

        <div className="info-container">
          <div className="location-list">
            <h2>Locations</h2>
            <ul>
              {locationData.map((location) => (
                <li
                  key={location.id}
                  className={selectedLocation?.id === location.id ? "active" : ""}
                  onClick={() => handleLocationSelect(location)}
                >
                  <MapPin size={16} />
                  <span>{location.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {selectedLocation && (
            <div className="location-details">
              <h2>{selectedLocation.name}</h2>

              <div className="location-image">
                <img src={selectedLocation.image || "/placeholder.svg"} alt={selectedLocation.name} />
              </div>

              <div className="location-description">
                <Info size={18} />
                <p>{selectedLocation.description}</p>
              </div>

              <div className="location-coordinates">
                <p>Latitude: {selectedLocation.latitude}</p>
                <p>Longitude: {selectedLocation.longitude}</p>
              </div>

              <div className="audio-player">
                <h3>
                  <Volume2 size={18} /> Audio Guide
                </h3>
                <audio ref={audioRef} />
                <button className="audio-button" onClick={toggleAudio}>
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  {isPlaying ? "Pause" : "Play"} Audio Guide
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Interactive Location Guide</p>
      </footer>
    </div>
  )
}

export default App

