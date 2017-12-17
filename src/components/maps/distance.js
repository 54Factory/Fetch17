/* global google */ 
import React from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import { GoogleMap, withGoogleMap, DirectionsRenderer } from 'react-google-maps';
import './map.css';


export const FetchV2DirectionsMap = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCCH6ORS-0oa4Jj3uy7DrB2cXPqMEu7Tgg",
        loadingElement:
          <div style={{height: `100%`}}>Loading</div>,
        containerElement:
          <div style={{ height: `100%` }} />,
        mapElement:
          <div style={{ height: `100%` }} />
      }),
      withGoogleMap,
      lifecycle({
        componentDidMount() {

          const DirectionsService = new google.maps.DirectionsService();
    
          DirectionsService.route({
            origin: new google.maps.LatLng(39.849557, -75.3557457), // Chester - Eden Green Physical Location
            destination: new google.maps.LatLng(39.5970878, -75.3783261),
            travelMode: google.maps.TravelMode.DRIVING,
          }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              
              console.log(result)
              this.setState({
                directions: result,
              });
              this.props.distance("directions", result)
              //this.props.getDetails(result)
            } else {
              console.error(`error fetching directions ${result}`);
            }
          });
        }
      })
      ) (props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={14}
        center={props.center}
        defaultOptions={{
          disableDefaultUI: false,
          scrollwheel: false   
        }}
      >
        {/* {props.markers.map(marker => (
          <Marker
            {...marker}
          />
        ))} */}
        {props.directions && <DirectionsRenderer directions={props.directions} />}
      </GoogleMap>
    )
  );
