import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

import { GOOGLE_MAPS_API_KEY } from '../../constants/config';

import './Maps.scss';
const MapComponent = withScriptjs(
  withGoogleMap((props) => {
    let onMarkerDragEnd = (e) => {
      let coordinates = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      props.address(coordinates);
    };

    return (
      <>
        <div className="mapMain" style={{ height: props.mapCompHeight }}>
          <GoogleMap
            defaultZoom={15}
            center={{ lat: parseFloat(props.coordinates?.lat), lng: parseFloat(props.coordinates?.lng) }}
          >
            <Marker
              noRedraw={false}
              name={'Dolores park'}
              position={{ lat: parseFloat(props.coordinates?.lat), lng: parseFloat(props.coordinates?.lng) }}
              draggable={true}
              onDragEnd={onMarkerDragEnd}
            />

            <Marker
              noRedraw={false}
              position={{ lat: parseFloat(props.driverLocation?.lat), lng: parseFloat(props.driverLocation?.lng) }}
              icon={{ url: process.env.PUBLIC_URL + '/images/carIcon.png' }}
              color="green"
            ></Marker>
          </GoogleMap>
        </div>
      </>
    );
  })
);

const Map = ({ mapHeight, mapCompHeight, ...rest }) => {
  return (
    <MapComponent
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&&libraries=places`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div className="mapContainer" style={{ height: mapHeight }} />}
      mapElement={<div className="mapElement" />}
      mapCompHeight={mapCompHeight}
      mapHeight={mapHeight}
      {...rest}
    />
  );
};

export default Map;
