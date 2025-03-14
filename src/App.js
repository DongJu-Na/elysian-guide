"use client"

import { useState, useRef, useEffect } from "react"
import "./App.css"
import { Play, Pause, MapPin, Info, Volume2, Youtube, BookOpen, Github, Instagram } from "lucide-react"
import LanguageSelector from "./component/language-selector"
import { useTranslation } from "react-i18next"
import locationData from "./component/locationData"

function App() {
  const { t, i18n } = useTranslation();
  const locations = locationData();
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // 카카오맵 관련 상태
  const mapRef = useRef(null);
  const roadviewRef = useRef(null);
  const [map, setMap] = useState(null);
  const [roadview, setRoadview] = useState(null);
  const [markerState, setMarkerState] = useState(null);
    const mapHeight = "100%";

  // 로드뷰 관련 상태
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // 중심 좌표 상태
  const [center, setCenter] = useState({
    lat: selectedLocation?.latitude || 37.8221226,
    lng: selectedLocation?.longitude || 127.5898427,
  })

  // 위치 선택 핸들러
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);

    // 중심 좌표 업데이트
    const newCenter = {
      lat: location.latitude,
      lng: location.longitude,
    };
    setCenter(newCenter);

    // 기존 마커 제거 후 새 마커 생성
    if (markerState !== null) markerState.setMap(null);

    if (map) {
      let marker;
      try{
        marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(location.latitude, location.longitude),
          map: map,
          draggable: true,
          image: isActive
            ? {
                src: "https://t1.daumcdn.net/localimg/localimages/07/2018/pc/roadview_minimap_wk_2018.png",
                size: { width: 26, height: 46 },
                options: {
                  spriteSize: { width: 1666, height: 168 },
                  spriteOrigin: { x: 705, y: 114 },
                  offset: { x: 13, y: 46 },
                },
              }
            : null,
        });
      }catch(Ex){
        console.info("에러",Ex);
      }
      console.info("marker",marker);

      // 마커 드래그 이벤트 추가
      window.kakao.maps.event.addListener(marker, "dragend", () => {
        const position = marker.getPosition();
        setCenter({
          lat: position.getLat(),
          lng: position.getLng(),
        });
      })

      setMarkerState(marker);
    }

    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      audioRef.current.src = location.audio;
      audioRef.current.load();
    }
  }

  // 오디오 재생/일시정지 토글
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

  // 로드뷰 토글 함수
  const toggleRoadview = () => {
    if (!isActive) {
      setIsActive(true);
      setIsVisible(true);

      // 현재 마커 위치에서 로드뷰 표시
      if (roadview && markerState) {
        const position = markerState.getPosition();
        const roadviewClient = new window.kakao.maps.RoadviewClient();

        roadviewClient.getNearestPanoId(position, 50, (panoId) => {
          console.info(panoId);
          if (panoId) {
            map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.ROADVIEW);
            roadview.setPanoId(panoId, position);
          } else {
            // 로드뷰가 없는 경우 알림
            alert("해당 위치에서 로드뷰를 표시할 수 없습니다.");
            map.removeOverlayMapTypeId(window.kakao.maps.MapTypeId.ROADVIEW); 
            setIsActive(false);
            setIsVisible(false);
            
          }
        })
      }
    } else {
      map.removeOverlayMapTypeId(window.kakao.maps.MapTypeId.ROADVIEW); 
      setIsActive(false);
      setIsVisible(false);
    }
  }

  const closeRoadview = () => {
    setIsVisible(false);
    setIsActive(false);
  }

  // 카카오맵 초기화
  const getKakao = () => {
    const mapContainer = document.getElementById("map");
    const roadviewContainer = document.getElementById("roadview");
    const mapScript = document.createElement("script");

    mapScript.async = true
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAOMAP_KEY}&autoload=false`

    document.head.appendChild(mapScript)

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        // 지도 초기화
        const mapOptions = {
          center: new window.kakao.maps.LatLng(center.lat, center.lng),
          level: 3,
        }
        const mapInstance = new window.kakao.maps.Map(mapContainer, mapOptions)
        const zoomControl = new window.kakao.maps.ZoomControl()
        const mapTypeControl = new window.kakao.maps.MapTypeControl()
        mapInstance.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT)
        mapInstance.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT)

        // 초기 마커 생성
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(center.lat, center.lng),
          map: mapInstance,
          draggable: true,
        })

        // 마커 드래그 이벤트
        window.kakao.maps.event.addListener(marker, "dragend", () => {
          const position = marker.getPosition()
          setCenter({
            lat: position.getLat(),
            lng: position.getLng(),
          })
        })

        // 로드뷰 초기화
        const roadviewInstance = new window.kakao.maps.Roadview(roadviewContainer)
        const roadviewClient = new window.kakao.maps.RoadviewClient()

        // 로드뷰 위치 변경 이벤트
        window.kakao.maps.event.addListener(roadviewInstance, "position_changed", () => {
          const position = roadviewInstance.getPosition()
          setCenter({
            lat: position.getLat(),
            lng: position.getLng(),
          })
        })

        roadviewClient.getNearestPanoId(new window.kakao.maps.LatLng(center.lat, center.lng), 50, (panoId) => {
          if (panoId) {
            roadviewInstance.setPanoId(panoId, new window.kakao.maps.LatLng(center.lat, center.lng))
          } else {
            setIsVisible(false)
          }
        })

        setMap(mapInstance);
        setRoadview(roadviewInstance);
        setMarkerState(marker);

        mapRef.current = mapInstance;
        roadviewRef.current = roadviewInstance;
      })
    }

    mapScript.addEventListener("load", onLoadKakaoMap);
    
  }

  // 지도 초기화
  useEffect(() => {
    getKakao()
  }, [])

  // 중심 좌표, 로드뷰 상태 변경 시 지도 및 로드뷰 업데이트
  useEffect(() => {
    const map = mapRef.current
    const roadview = roadviewRef.current

    if (roadview && map) {
      roadview.relayout();
      map.relayout();
      map.setCenter(new window.kakao.maps.LatLng(center.lat, center.lng))

      // 로드뷰가 활성화된 경우 로드뷰 위치도 업데이트
      if (isActive) {
        const roadviewClient = new window.kakao.maps.RoadviewClient()
        roadviewClient.getNearestPanoId(new window.kakao.maps.LatLng(center.lat, center.lng), 50, (panoId) => {
          if (panoId) {
            roadview.setPanoId(panoId, new window.kakao.maps.LatLng(center.lat, center.lng))
          } else {
            setIsVisible(false)
            setIsActive(false) // 로드뷰가 없는 경우 모드도 비활성화
          }
        })
      }

      // 마커 이미지 업데이트
      if (markerState) {
        if (isActive) {
          markerState.setImage(
            new window.kakao.maps.MarkerImage(
              "https://t1.daumcdn.net/localimg/localimages/07/2018/pc/roadview_minimap_wk_2018.png",
              new window.kakao.maps.Size(26, 46),
              {
                spriteSize: new window.kakao.maps.Size(1666, 168),
                spriteOrigin: new window.kakao.maps.Point(705, 114),
                offset: new window.kakao.maps.Point(13, 46),
              },
            ),
          )
        } else {
          markerState.setImage(null);
        }
      }
    }
  }, [isVisible, center, isActive])

  // 언어 변경 시 선택된 위치 업데이트
  useEffect(() => {
    if (selectedLocation) {
      const updatedLocation = locations.find((loc) => loc.id === selectedLocation.id)
      if (updatedLocation) {
        updatedLocation.audio = updatedLocation.audio
        setSelectedLocation(updatedLocation)
      }
    }
  }, [i18n.language, locations])


  return (
    <div className="app-container">
      <header className="app-header">
        <h1>ELYSIAN Location Guide</h1>
        <LanguageSelector />
      </header>

      <div className="content-container">
        <div className="map-placeholder" style={{ position: "relative", height: mapHeight, display: "flex" }}>
          <div
            id="map"
            style={{
              width: !isVisible ? "100%" : "50%",
              height: mapHeight,
            }}
          ></div>

          <div id="roadviewControl" className={isActive ? "active" : ""} onClick={toggleRoadview}>
            <span className="img"></span>
          </div>

          <div
            style={{
              position: "relative",
              width: isVisible ? "50%" : "0",
              height: mapHeight,
              overflow: "hidden",
            }}
          >
            <div
              id="roadview"
              style={{
                width: "100%",
                height: "100%",
              }}
            ></div>

            <div id="close" title="로드뷰닫기" onClick={closeRoadview}>
              <span className="img"></span>
            </div>
          </div>
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

              <div className="location-coordinates" style={{ display: "none" }}>
                <p id="result"></p>
              </div>

              <div className="audio-player">
                <h3>
                  <Volume2 size={18} /> {t("page.audioGuide")}
                </h3>
                <audio ref={audioRef} src={selectedLocation.audio} />
                <button className="audio-button" onClick={toggleAudio}>
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  {isPlaying ? "Pause" : "Play"} Audio Guide
                  <img
                    src="/elysian-guide/images/CLOVA_dubbing_watermark_black.png"
                    alt="CLOVA dubbing"
                    className="audio-button-watermark"
                  />
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
            href="https://www.instagram.com/elysianresort/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="인스타"
          >
            <Instagram size={20} />
          </a>
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
          <a
            href="https://github.com/DongJu-Na"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="깃허브"
          >
            <Github size={20} />
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App

