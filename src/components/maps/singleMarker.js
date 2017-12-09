import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import { GoogleMap, withGoogleMap,  Marker } from 'react-google-maps';
import './map.css';


const FetchV2GoogleMap = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCCH6ORS-0oa4Jj3uy7DrB2cXPqMEu7Tgg",
        loadingElement:
          <div style={{height: `300px`}}>Loading</div>,
        containerElement:
          <div style={{ height: `300px` }} />,
        mapElement:
          <div style={{ height: `300px` }} />
      }),
      withGoogleMap
      ) (props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={14}
        center={props.center}
        onClick={props.onMapClick}
        defaultOptions={{
          disableDefaultUI: false,
          scrollwheel: false
          
        }}
      >
        {props.markers.map(marker => (
          <Marker
            {...marker}
          />
        ))}
      </GoogleMap>
    )
  );


export default class SingleCollectionMap extends Component {

  state = {
    markers: [],
    customerId: undefined,
    location: undefined,
  };
  
  handleMapLoad = this.handleMapLoad.bind(this);
  handleMapClick = this.handleMapClick.bind(this);
  setMapCenter = this.setMapCenter.bind(this);


  setMapCenter() {
    return 
  }

  handleMapLoad(map) {
    this._mapComponent = map
  }

  handleMapClick() {
    this._removeAllMarkers()
  }

  render() {
    console.log("Render SSMap", this.props)
    const { markers } = this.props
    return (
      <div style={{height: `100%`}}>
        <FetchV2GoogleMap
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          center={{ lat: markers.lat, lng: markers.lng }}
          markers={[{
            position: {
              lat: markers.lat,
              lng: markers.lng,
            },
            key: `id`,
            defaultAnimation: 3,
          }]}
        />
      </div>
    )
  }
}

