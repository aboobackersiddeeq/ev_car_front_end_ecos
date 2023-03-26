import React, { useRef, useState } from "react";
import HeaderTwo from '../../components/header/HeaderTwo'
import "mapbox-gl/dist/mapbox-gl.css";
import {  GeoAltFill } from "react-bootstrap-icons";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
  FullscreenControl,
  Popup,
  
} from "react-map-gl";
function MapboxMap() {
  const [newPopup, setNewPopup] = useState(null);
  const [viewPort, setViewPort] = React.useState({
    longitude: 54.922096,
    latitude: 25.914627,
    width : '100vh',
    height:"100vh", 
     
})
  const [currentId, setCurrentId] = useState("");
  const mapRef = useRef();

//   const onSelectCity = useCallback(({longitude, latitude}) => {
//     mapRef.current?.flyTo({center: [longitude, latitude], duration: 1000});
//   }, []);
  const handileMarker = (id,lag,t) => {
    
    setCurrentId(id);
    // onSelectCity(lag,t)
    setViewPort({...viewPort,latitude:t,longitude:lag})
    // setLng(lag)
    // setLat(t)
  


  };
  const palace = [
    { lag: 54, lat: 27, description: "charging station1", _id: 1 },
    { lag: 60, lat: 25, description: "charging station2", _id: 2 },
    { lag: 80, lat: 35, description: "charging station3", _id: 3 },
    { lag: 81, lat: 29, description: "charging station4", _id: 4 },
  ];
  const currentUser = 1;
  const handleDubleClick = (e) => {
    const { lng, lat } = e.lngLat;
    setNewPopup({ lng, lat });
 
  };

  return (
    <div>
       <HeaderTwo/>
      <ReactMapGL ref={mapRef}
        style={{ width: "100%", height: "100vh", border: "2px solid red" }}
         
         { ...viewPort }
        onMove={ (event)=>{setViewPort(event.viewPort)}}
        onDblClick={handleDubleClick}
        mapboxAccessToken="pk.eyJ1IjoicmFzaGlkcmFzaGkiLCJhIjoiY2xmbm5yazJqMDEyNjN1cW15bW16aHZyZyJ9.z8umjVwkkrxiAoVlKMeHOw"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        zoom={3}
        
      >
         {palace.map((val) => {
          return (
            <>
              <Marker
                longitude={val.lag}
                latitude={val.lat}
                onClick={() => handileMarker(val._id,val.lag,val.lat)}
              >
                <div>
                  <GeoAltFill
                    style={{
                      color: val._id === currentUser ? "red" : "green",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </Marker>
              {currentId === val._id && (
                <Popup
                  longitude={val.lag}
                  latitude={val.lat}
                  closeButton={true}
                  anchor="left"
                  closeOnClick={false}
                  onClose={() => setNewPopup(null)}
                  style={{ color: "red" }}
                >
                  {" "}
                  {val.description}
                </Popup>
              )}
            </>
          );
        })}
        <NavigationControl position="bottom-right" />
        <FullscreenControl />
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
        {newPopup && (
          <Popup
            longitude={newPopup.lng}
            latitude={newPopup.lat}
            anchor="left"
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewPopup(null)}
            style={{ color: "red" }}
          >
            {" "}
            hellooo
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}

export default MapboxMap;