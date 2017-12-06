import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import { Link } from 'react-router-dom';
import { GoogleMap, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { Col, Thumbnail } from 'react-bootstrap';
import './map.css';


const FetchV2GoogleMap = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCCH6ORS-0oa4Jj3uy7DrB2cXPqMEu7Tgg",
        loadingElement:
          <div style={{height: `600px`}}>Loading</div>,
        containerElement:
          <div style={{ height: `600px` }} />,
        mapElement:
          <div style={{ height: `600px` }} />
      }),
      withGoogleMap,
      ) (props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={8}
        defaultCenter={{ lat: 39.8407815, lng: -75.3695485 }}
        onClick={props.onMapClick}
        defaultOptions={{
          disableDefaultUI: false,
          scrollwheel: false
          
        }}
      >
        {Boolean(props.markers) && props.markers.map((marker , index) => (
          <Marker
            {...marker}
            showInfo={false}
            icon={require('../../../assets/marker.svg')}
            onClick={() => props.onMarkerClick(marker)}
            defaultAnimation={2}
            key={index}
          >
            {marker.showInfo && (
              <InfoWindow
                onCloseClick={() => props.onMarkerClose(marker)}>
                <Link to={`/locations/${marker.id}`}>
                  <Col xs={12} md={12}>
                    <Thumbnail src={"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Tom%27s_Restaurant%2C_NYC.jpg/220px-Tom%27s_Restaurant%2C_NYC.jpg"} alt="242x200">
                      <h3>{marker.locationName}</h3>
                      <p>{marker.street}</p>
                      <p>{marker.city}</p>
                      <p>{marker.state}</p>
                      <p>{marker.zip}</p>
                    </Thumbnail>
                  </Col>
                </Link>
              </InfoWindow>
            )}
          </Marker>
        ))}
        {/*<TrafficLayer autoUpdate />*/}
      </GoogleMap>
    )
  );


export default class OilCollectionMap extends Component {

  state = {
    markers: [],
    customerId: undefined,
    location: undefined,
  };
  
  handleMapLoad = this.handleMapLoad.bind(this);
  //handleMapClick = this.handleMapClick.bind(this);
  handleMarkerClick = this.handleMarkerClick.bind(this);
  handleMarkerClose = this.handleMarkerClose.bind(this);

 
  componentDidMount() {
    return this.handleMarkers()
  }

  handleMarkers(props) {
    
    const newMarkers = this.props.markers.map(location => {

        console.log(newMarkers)
        return {
          id: location.oilCollectionService.service.location.id,
          locationName: location.oilCollectionService.service.location.locationName,
          street: location.oilCollectionService.service.location.street,
          city: location.oilCollectionService.service.location.city,
          state: location.oilCollectionService.service.location.state,
          position: {
            lat: location.oilCollectionService.service.location.lat,
            lng: location.oilCollectionService.service.location.lng,
          },
        }
      });
    this.setState({
      markers: newMarkers
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.markers !== this.props.markers) {
      this.handleMarkers();
      
   }
  }

  handleMarkerClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true,
          }
        }
        return marker
      }),
    })
  }

  handleMarkerClose(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
          }
        }
        return marker
      }),
    })
  }

  handleMapLoad(map) {
    this._mapComponent = map
  }

  // handleMapClick() {
  //   this._removeAllMarkers()
  // }

  render() {
    console.log("Render", this.props)
    return (
      <div style={{height: `100%`}}>
        <FetchV2GoogleMap
          onMapLoad={this.handleMapLoad}
          // onMapClick={this.handleMapClick}
          markers={this.state.markers}
          onMarkerClick={this.handleMarkerClick}
          onMarkerClose={this.handleMarkerClose}
        />
      </div>
    )
  }
}

