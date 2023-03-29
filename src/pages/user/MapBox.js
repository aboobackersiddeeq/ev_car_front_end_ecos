import React, { useEffect, useRef, useState } from 'react';
import HeaderTwo from '../../components/header/HeaderTwo';
import 'mapbox-gl/dist/mapbox-gl.css';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { GeoAltFill, ArrowClockwise, Key } from 'react-bootstrap-icons';
import '../../style/map.css';
import axios from 'axios';
import axiosInstance from '../../axios/axios';
import Map, {
  GeolocateControl,
  Marker,
  NavigationControl,
  FullscreenControl,
  Popup,
} from 'react-map-gl';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { toast } from 'react-hot-toast';
import Geocoder from '../../components/Geocoder';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import {format}from 'timeago.js'
function MapboxMap() {
  const [places, setPlace] = useState([]);
  const [newPopup, setNewPopup] = useState(null);
  const [viewPort, setViewPort] = React.useState({
    longitude: 72.6267489,
    latitude: 23.175841,
    zoom: 12,
  });
  const user = useSelector((state) => state.user.value);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('');
  const [currentId, setCurrentId] = useState('');
  const [pin, setPin] = useState([]);
  const [selectPin, setSelectPin] = useState([]);
  const handilePin = (data) => {
    const long = data[0];
    const lat = data[1];
    console.log('daaaaaaaaaa');
    axiosInstance.post('/map/get-map-near', { long, lat }).then((response) => {
      setSelectPin(response.data.result);
    });
  };
  console.log(selectPin);
  const mapRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (type === '' || desc.trim() === '' || title.trim() === '') {
        swal('sorry!', 'All fields are required!', 'error');
      } else {
        const email = user.email;
        const username = user.username;
        axiosInstance
          .post('/map/add-map', {
            type,
            desc,
            title,
            lat: newPopup.lat,
            long: newPopup.lng,
            email,
            username,
          })
          .then((response) => {
            setNewPopup(null);
            setPin(response.data.result);
          });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handileMarker = (id, lag, t) => {
    setCurrentId(id);
    setViewPort({ ...viewPort, latitude: t, longitude: lag });
  };
  useEffect(() => {
    try {
      axiosInstance.get('/map/get-map', {}).then((response) => {
        setPin(response.data.result);
      });
    } catch (error) {
      toast.error(error.message);
    }
  }, []);
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
        setViewPort({
            ...viewPort,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            zoom: 10,
        });
    });
  },[])
  useEffect(() => {
    axios
      .get(
        'https://api.openchargemap.io/v3/poi/?output=json&countrycode=IN&maxresults=100&key=278d57de-b26d-4512-8553-1e14532c4657&StateOrProvince  =kerala'
      )
      .then((response) => {
        setPlace(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDubleClick = (e) => {
    console.log(e, 'dobleclick data');
    const { lng, lat } = e.lngLat;
    setNewPopup({ lng, lat });
  };

  return (
    <div>
      <HeaderTwo />
      <div className="row map-perent">
        <div className="col-md-3 content-map-child">
          <div className="keys-para">
            <h3 className="keys">Keys</h3>
            <li className="li-keys-map">
              <GeoAltFill className="tata-icon" />
              Tata Motors Station
            </li>
            <li className="li-keys-map">
              <GeoAltFill className="kseb-icon" />
              KSEB
            </li>
            <li className="li-keys-map">
              <GeoAltFill className="others-icon" />
              Others
            </li>
          </div>
          {/* <h4 className="charging-map">
            Charging Locator{' '}
            <span className="arrow">
              <ArrowClockwise />
            </span>
          </h4>

          <div className="input-field  ">
            <div className="select_box_map">
              <select
                className="form-control map-state  has-content-map "
                id="state"
                name="state"
               
              >
                <option value="">Select State</option>

                <option value="19">Kerala</option>
                <option value="35">Tamil Nadu</option>
                <option value="36">Telangana</option>
              </select>
          
            </div>
            <span
              className="msg"
              id="state_msg"
              style={{ display: 'none' }}
            ></span>
          </div>

          <div className=" input-field ">
            <div className="select_box_map">
              <select
           
                className="form-control  map-state  has-content-map"
                id="city"
                name="city"
              
              >
                {' '}
                <option value="">Select City</option>
                <option value="Bijoynagar">Bijoynagar</option>
                <option value="Biswanath Chariali">Biswanath Chariali</option>
                <option value="Bokakhat">Bokakhat</option>
                <option value="Bongaigaon">Bongaigaon</option>
              </select>
             
            </div>
          </div> */}
           {selectPin.length !== 0 ?
          <p className="results-map-head">Results For Charging Stations <span className="arrow" onClick={()=>{setSelectPin([])}}>
              <ArrowClockwise />
            </span></p> : <p className="results-map-head">Drive What Drove Electric </p>}
          <div className="rusult-for">
            {selectPin.length !== 0 &&
              selectPin.map((val) => {
                return (
                  <div className="result-para">
                    <h6>{val.title}</h6>
                    <p className="desc-selected-map">
                       {val.desc},{val.type},{val.username}
                    </p>{' '}
                    <h6 className="view-On-map">View On Map | Get Direction</h6>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="col-md-9 map-child ">
          <Map
            ref={mapRef}
            style={{ width: '100%', height: '90vh' }}
            {...viewPort}
            onMove={(event) => {
              setViewPort(event.viewPort);
            }}
            onDblClick={handleDubleClick}
            mapboxAccessToken="pk.eyJ1IjoicmFzaGlkcmFzaGkiLCJhIjoiY2xmbm5yazJqMDEyNjN1cW15bW16aHZyZyJ9.z8umjVwkkrxiAoVlKMeHOw"
            mapStyle="mapbox://styles/mapbox/streets-v9"
            // zoom={3}
          >
            {places && selectPin.length === 0 &&
              places.map((val, i) => {
                return (
                  <div key={i}>
                    <Marker
                      longitude={val.AddressInfo.Longitude}
                      latitude={val.AddressInfo.Latitude}
                      onClick={() =>
                        handileMarker(
                          i,
                          val.AddressInfo.Longitude,
                          val.AddressInfo.Latitude
                        )
                      }
                    >
                      <div>
                        <GeoAltFill
                          className="marker-geofill"
                          style={{
                            fontSize: i === currentId ? '30px' : ' ',
                            cursor: 'pointer',
                          }}
                        />
                      </div>
                    </Marker>
                    {currentId === i && (
                      <Popup
                        longitude={val.AddressInfo.Longitude}
                        latitude={val.AddressInfo.Latitude}
                        closeButton={true}
                        anchor="left"
                        closeOnClick={false}
                        onClose={() => setNewPopup(null)}
                      >
                        {' '}
                        <div>
                          <h6>{val.AddressInfo.AccessComments}</h6>
                          <p>
                            {val.AddressInfo.AddressLine1}
                            {val.AddressInfo.AddressLine2}, Charging location{' '}
                            {i + 1}
                          </p>
                        </div>
                      </Popup>
                    )}
                  </div>
                );
              })}

            {selectPin.length === 0
              ? pin.map((val, i) => {
                  return (
                    <div key={val._id}>
                      <Marker
                        longitude={val.long}
                        latitude={val.lat}
                        onClick={() =>
                          handileMarker(val._id, val.long, val.lat)
                        }
                      >
                        <div>
                          <GeoAltFill
                            className="marker-geofill"
                            style={{
                              color: val.type === 'Tata'? 'blue' :val.type === 'KSEB'?'green':'' ,
                              fontSize: val._id === currentId ? '30px' : ' ',
                              cursor: 'pointer',
                            }}
                          />
                        </div>
                      </Marker>
                      {currentId === val._id && (
                        <Popup
                          longitude={val.long}
                          latitude={val.lat}
                          closeButton={true}
                          anchor="left"
                          closeOnClick={false}
                          onClose={() => setNewPopup(null)}
                        >
                          {' '}
                          <div>
                            <h6>{val.title}</h6>
                            <p>
                              {val.desc}
                              {val.type}, Charging location {i + 1}
                              <p style={{ color: 'blue' }}>
                                {/* {format(val.createdAt)} */}
                              </p>
                            </p>
                          </div>
                        </Popup>
                      )}
                    </div>
                  );
                })
              : selectPin.map((val, i) => {
                  return (
                    <div key={val._id}>
                      <Marker
                        longitude={val.long}
                        latitude={val.lat}
                        onClick={() =>
                          handileMarker(val._id, val.long, val.lat)
                        }
                      >
                        <div>
                          <GeoAltFill
                            className="marker-geofill"
                            style={{
                              color: 'green',
                              fontSize: val._id === currentId ? '30px' : ' ',
                              cursor: 'pointer',
                            }}
                          />
                        </div>
                      </Marker>
                      {currentId === val._id && (
                        <Popup
                          longitude={val.long}
                          latitude={val.lat}
                          closeButton={true}
                          anchor="left"
                          closeOnClick={false}
                          onClose={() => setNewPopup(null)}
                        >
                          {' '}
                          <div>
                            <h6>{val.title}</h6>
                            <p>
                              {val.desc}
                              {val.type}, Charging location {i + 1}
                              <p style={{ color: 'blue' }}>
                                {/* {format(val.createdAt)} */}
                              </p>
                            </p>
                          </div>
                        </Popup>
                      )}
                    </div>
                  );
                })}
            <NavigationControl position="bottom-right" />
            <FullscreenControl position="top-left" />
            <GeolocateControl
              position="top-left"
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
            />
            <Geocoder handilePin={handilePin} />

            {newPopup &&
              (user ? (
                Object.keys(user).length !== 0 ? (
                  <Popup
                    longitude={newPopup.lng}
                    latitude={newPopup.lat}
                    anchor="left"
                    closeButton={true}
                    closeOnClick={true}
                    onClose={() => setNewPopup(null)}
                    style={{ color: 'red' }}
                  >
                    <div>
                      <form onSubmit={handleSubmit} className="form-d">
                        <label className="label-d">Charging Station</label>
                        <input
                          className="input-d"
                          placeholder="Enter charging station name"
                          autoFocus
                          required
                          minLength={3}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <label className="label-d">Description</label>
                        <textarea
                          className="textarea-d"
                          required
                          minLength={10}
                          placeholder="Say us something about this place."
                          onChange={(e) => setDesc(e.target.value)}
                        />
                        <label className="label-d">Keys</label>
                        <Form.Select
                          className="select-d"
                          onChange={(e) => setType(e.target.value)}
                          required
                        >
                          <option> Select keys</option>
                          <option value="Tata">Tata Motors</option>
                          <option value="KSEB">KSEB</option>
                          <option value="Others">Others</option>
                        </Form.Select>
                        <br />
                        <button type="submit" className="submitButton">
                          Add Pin
                        </button>
                      </form>
                    </div>
                  </Popup>
                ) : (
                  <Popup
                    longitude={newPopup.lng}
                    latitude={newPopup.lat}
                    anchor="left"
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => setNewPopup(null)}
                  >
                    <div>
                      Please Login{' '}
                      <span
                        style={{ color: 'blue' }}
                        onClick={() => {
                          navigate('/login');
                        }}
                      >
                        Click here
                      </span>
                    </div>
                  </Popup>
                )
              ) : (
                <Popup
                  longitude={newPopup.lng}
                  latitude={newPopup.lat}
                  anchor="left"
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setNewPopup(null)}
                >
                  <div>
                    Please Login{' '}
                    <span
                      style={{ color: 'blue' }}
                      onClick={() => {
                        navigate('/login');
                      }}
                    >
                      Click here
                    </span>
                  </div>
                </Popup>
              ))}
          </Map>
        </div>
      </div>
    </div>
  );
}

export default MapboxMap;
