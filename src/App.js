"use client"

import { useState, useRef, useEffect } from "react"
import "./App.css"
import { Play, Pause, MapPin, Info, Volume2 } from "lucide-react"
import LanguageSelector from "./component/language-selector"
import { useTranslation } from "react-i18next"

// Sample location data
const locationData = [
  {
    id: 1,
    name: "골프 VALLEY COURSE",
    description: "A large urban park in the heart of the city.",
    latitude: 40.785091,
    longitude: -73.968285,
    image: "/placeholder.svg?height=300&width=400",
    audio: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3",
  },
  {
    id: 2,
    name: "골프 LAKE COURSE",
    description: "An iconic suspension bridge connecting Manhattan and Brooklyn.",
    latitude: 40.7061,
    longitude: -73.9969,
    image: "/placeholder.svg?height=300&width=400",
    audio: "https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3",
  },
  {
    id: 3,
    name: "골프 HILL COURSE",
    description: "Famous commercial intersection known for its bright lights and billboards.",
    latitude: 40.758,
    longitude: -73.9855,
    image: "/placeholder.svg?height=300&width=400",
    audio: "https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-621.mp3",
  },
]

function App() {
  const { t } = useTranslation();
  const [selectedLocation, setSelectedLocation] = useState(locationData[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
  const kakaoMaps = useRef(null);
  const [map, setMap] = useState(null);


  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      audioRef.current.src = location.audio;
      audioRef.current.load();
    }
  }

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }
  
    const getKakao = () => {
      const mapContainer = document.getElementById('map');
      const mapScript = document.createElement("script");

      mapScript.async = true;
      mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAOMAP_KEY}&autoload=false`;
    
      document.head.appendChild(mapScript);

      const onLoadKakaoMap = () => {
        window.kakao.maps.load(() => {
          if (!map) {
            const mapOptions = {
              center: new window.kakao.maps.LatLng(37.8221226, 127.5898427),
              level: 2,
            };
            const map = new window.kakao.maps.Map(mapContainer, mapOptions);
            const zoomControl = new window.kakao.maps.ZoomControl();
            const mapTypeControl = new window.kakao.maps.MapTypeControl();
            map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
            map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

            setMap(map);
                  
          }
        });
      };
      mapScript.addEventListener("load", onLoadKakaoMap);

      
      
    };
    useEffect(() => {
      getKakao();
    }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>ELYSIAN Location Guide </h1>
        <LanguageSelector />
      </header>

      <div className="content-container">
        {/* Map container will be added by the user */}
        
        <div className="map-placeholder">
          <div id="map" ref={kakaoMaps} style={{width:"100%",height:"100%"}}></div>
        </div>

        <div className="info-container">
          <div className="location-list">
            <h2>{t("locations")}</h2>
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

