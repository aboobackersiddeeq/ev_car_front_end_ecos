import React, { useEffect, useRef, useState } from 'react';
import HeaderTwo from '../../components/header/HeaderTwo';
import 'mapbox-gl/dist/mapbox-gl.css';
import SearchIcon from '@mui/icons-material/Search';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { GeoAltFill, ArrowClockwise } from 'react-bootstrap-icons';
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
import Footer from '../../components/footer/Footer';
// import format from 'timeago';
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
    axiosInstance.post('/map/get-map-near', { long, lat }).then((response) => {
      setSelectPin(response.data.result);
    });
  };
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
      toast.error('network error' + error.message);
    }
  }, []);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewPort({
        ...viewPort,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        zoom: 10,
      });
    });
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    axios
      .get(
        `https://api.openchargemap.io/v3/poi/?output=json&countrycode=IN&maxresults=100&key=${process.env.REACT_APP_API_KEY}&StateOrProvince  =kerala`
      )
      .then((response) => {
        setPlace(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const handleDubleClick = (e) => {
    const { lng, lat } = e.lngLat;
    setNewPopup({ lng, lat });
  };

  return (
    <>
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
              <GeoAltFill className="ather-icon" />
              Ather
            </li>
            <li className="li-keys-map">
              <GeoAltFill className="others-icon" />
              Others
            </li>
          </div>

          {selectPin.length !== 0 ? (
            <p className="results-map-head">
              Results For Charging Stations{' '}
              <span
                className="arrow"
                onClick={() => {
                  setSelectPin([]);
                }}
              >
                <ArrowClockwise />
              </span>
            </p>
          ) : (
            <div>
              {/* <p className="results-map-head">Drive What Drove Electric </p> */}
              <div className="keys-para">
                <h3 className="keys">Search</h3>
                <li className="li-keys-map">
                  <CallMissedOutgoingIcon className="tata-icon" />
                  Go to top right side search bar
                 
                </li>
                <li className="li-keys-map">
                  <SearchIcon className="tata-icon" />
                  Seach your place
                </li>
                <li className="li-keys-map">
                  <TravelExploreIcon className="tata-icon" />
                  Find your nearest palce
                </li>
              </div>
            </div>
          )}
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
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            // zoom={3}
          >
            {places &&
              selectPin.length === 0 &&
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
                          <h6 className="popup-title">
                            {val.AddressInfo.AccessComments}
                          </h6>
                          <p className="popup-desc">
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
                              color:
                                val.type === 'Tata'
                                  ? 'blue'
                                  : val.type === 'KSEB'
                                  ? 'green'
                                  : val.type === 'Ather'
                                  ? '#be7d32'
                                  : '',
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
                            <h6 className="popup-title">{val.title}</h6>
                            <p className="popup-desc">
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
                              color:
                                val.type === 'Tata'
                                  ? 'blue'
                                  : val.type === 'KSEB'
                                  ? 'green'
                                  : val.type === 'Ather'
                                  ? '#be7d32'
                                  : '',
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
                            <h6 className="popup-title">{val.title}</h6>
                            <p className="popup-desc">
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
                          <option value="Ather">Ather</option>
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
      <Footer />
    </>
  );
}

export default MapboxMap;
