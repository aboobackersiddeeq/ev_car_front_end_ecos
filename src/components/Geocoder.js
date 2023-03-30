import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useControl } from 'react-map-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const Geocoder = (props) => {
  const ctrl = new MapBoxGeocoder({
    accessToken:
      'pk.eyJ1IjoicmFzaGlkcmFzaGkiLCJhIjoiY2xmbm5yazJqMDEyNjN1cW15bW16aHZyZyJ9.z8umjVwkkrxiAoVlKMeHOw',
    // marker: false,
    collapsed: true,
  });
  useControl(() => ctrl);
  ctrl.on('result', (e) => {
    const coords = e.result.geometry.coordinates;
    props.handilePin(coords);
    console.log(coords);
  });
  return null;
};

export default Geocoder;
