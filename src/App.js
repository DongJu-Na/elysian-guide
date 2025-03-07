"use client"

import { useState, useRef, useEffect } from "react"
import "./App.css"
import { Play, Pause, MapPin, Info, Volume2, Youtube, BookOpen } from "lucide-react"
import LanguageSelector from "./component/language-selector"
import { useTranslation } from "react-i18next"
import locationData from "./component/locationData";

function App() {
  const { t, i18n } = useTranslation();
  const locations = locationData();
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
  const kakaoMaps = useRef(null);
  const [map, setMap] = useState(null);


  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    map.panTo(new window.kakao.maps.LatLng(location.latitude, location.longitude));
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
              level: 1,
            };
            const map = new window.kakao.maps.Map(mapContainer, mapOptions);
            const zoomControl = new window.kakao.maps.ZoomControl();
            const mapTypeControl = new window.kakao.maps.MapTypeControl();
            map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
            map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

              window.kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
      
                console.log("클릭");
                let latlng = mouseEvent.latLng;
                let message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
                    message += '경도는 ' + latlng.getLng() + ' 입니다';
                
                let resultDiv = document.getElementById('result'); 
                resultDiv.innerHTML = message;
                
            });

            setMap(map);
                  
          }
        });
      };
      mapScript.addEventListener("load", onLoadKakaoMap);

      
      
    };
    useEffect(() => {
      getKakao();
    }, []);

    

    useEffect(() => {
      if (selectedLocation) {
        const updatedLocation = locations.find(
          (loc) => loc.id === selectedLocation.id
        );
        if (updatedLocation) {
          setSelectedLocation(updatedLocation); // 새로운 번역된 데이터 적용
        }
      }
    }, [i18n.language, locations]);

    

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
            <h2>{t("page.locations")}</h2>
            <ul>
              {locations.map((location) => (
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

          {
          selectedLocation && (
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
                <p id="result"></p>
              </div>

              <div className="audio-player">
                <h3>
                  <Volume2 size={18} /> {t("page.audioGuide")}
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
        <div className="social-icons">
          <a
            href="https://blog.naver.com/elly4love"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="블로그"
          >
            <BookOpen size={20} />
          </a>
          <a
            href="https://www.youtube.com/@elysianResort"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="유튜브"
          >
            <Youtube size={20} />
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App

