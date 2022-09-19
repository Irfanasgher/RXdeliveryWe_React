/* global google */
import React, { useState, useEffect } from 'react';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { getCity, getStreetAddress, getState, getZipCode } from '../../../modules/common/utils';
import { MapMarker, MapMarkerCheck } from '../../../Icons';

import './AutoCompleteAddress.scss';

const AutoCompleteAddress = ({ streetAddress1, setFieldValue, setCoordinates, defaultCoordinates, searchRadius }) => {
  const [pharmacyCoordinates, setPharmacyCoordinates] = useState({});
  useEffect(() => {
    setPharmacyCoordinates({ ...defaultCoordinates });
  }, [defaultCoordinates]); // eslint-disable-line react-hooks/exhaustive-deps

  const mapSelectedAddressOnFields = (place, setFieldValue) => {
    let coordinates = {
      lat: place?.geometry?.location?.lat(),
      lng: place?.geometry?.location?.lng(),
    };
    setCoordinates(coordinates);

    setFieldValue('latitude', coordinates.lat);
    setFieldValue('longitude', coordinates.lng);

    let address = getStreetAddress(place.address_components);
    setFieldValue('streetAddress1', address);

    let city = getCity(place.address_components);
    setFieldValue('city', city);

    let state = getState(place.address_components);
    setFieldValue('state', state);

    let zipCode = getZipCode(place.address_components);
    setFieldValue('zipCode', zipCode);
  };

  const handlePlaceSelect = async (address, setFieldValue) => {
    const data = await geocodeByAddress(address);
    mapSelectedAddressOnFields(data[0], setFieldValue);
  };

  const searchOptions = {
    location: searchRadius ? new google.maps.LatLng(pharmacyCoordinates.lat, pharmacyCoordinates.lng) : undefined,
    radius: searchRadius ? searchRadius : undefined,
    types: ['address'],
  };

  return (
    <PlacesAutocomplete
      value={streetAddress1}
      onChange={(address) => setFieldValue('streetAddress1', address)}
      onSelect={(address) => handlePlaceSelect(address, setFieldValue)}
      searchOptions={searchOptions}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="autocomplete-main" style={{ marginRight: '16px', marginBottom: '5px' }}>
          <div className="ant-col ant-form-item-label">
            <label className="" title="Street Address 2">
              Street Address
            </label>
          </div>
          <input
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: 'location-search-input ant-input',
            })}
          />
          <div className="autocomplete-dropdown-container">
            <Spin indicator={<LoadingOutlined />} spinning={loading}>
              {/* {loading && <div>Loading...</div>} */}
              {suggestions.map((suggestion, index) => {
                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    key={index}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    {suggestion.active ? (
                      <MapMarkerCheck className="map-marker" />
                    ) : (
                      <MapMarker className="map-marker" />
                    )}
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </Spin>
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default AutoCompleteAddress;
