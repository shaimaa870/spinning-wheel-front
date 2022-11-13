import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from "react-google-maps";
import { compose, withProps } from "recompose";

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?
    v=3.exp&libraries=geometry,drawing
      ,places&key=AIzaSyBfuoFcvmTLMOXN42v_-3JF4iergAsaOXE`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(({ onDragEnd, defaultCenter, defaultZoom = 10 }) => (
  <GoogleMap defaultZoom={defaultZoom} center={defaultCenter}>
    <Marker
      draggable={true}
      position={defaultCenter}
      onDragEnd={(e) =>  onDragEnd(e.latLng)}
    />
  </GoogleMap>
));

export default MyMapComponent;
