import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withApollo, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';
import { withScriptjs, GoogleMap, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { Col, Thumbnail } from 'react-bootstrap';
import '../map.css';

const allOilCollectionServices = gql`
query PendingPickups {
  allOilCollectionServices(
    filter: {
    oilCollectionState: {
      active: true
    }  
  }, 
    orderBy: startDate_ASC
  ) {
    id
    startDate
    oilCollectionRecords{
      id
    }
    truck {
      id
      name
    }
    service {
      id
      location{
        locationName
        street
        city
        state
        zip
        lat
        lng
      }
    }
    
  }
}
`

const FetchV2GoogleMap =  _.flowRight(
      withScriptjs,
      withGoogleMap,
      ) (props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={9}
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
            icon={marker.isOwnMarker ? require('../../../../assets/marker_blue.svg') : require('../../../../assets/marker.svg')}
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


class OilCollectionPendingPickUpsMap extends Component {

  state = {
    markers: [],
    location: undefined,
    truckName: []
  };

  // async componentDidMount() {
  //   console.log(this.previousState)
  //   this.locationSubscription = this.props.SetUps.subscribeToMore({
  //     document: gql`
  //         subscription {
  //           SetUpService(filter: {
  //               mutation_in: [CREATED, UPDATED]
  //             }) {
  //                 mutation
  //                 node {
  //                   id
  //                  service {
  //                     id
  //                   location {
  //                     id
  //                     locationName
  //                     street
  //                     city
  //                     state
  //                     zip
  //                     lat
  //                     lng
  //                     }
  //                   }
  //                 }
  //             }
  //         }
  //     `,
  //     variables: null,
  //     updateQuery: (previousState, {subscriptionData}) => {
  //       if (subscriptionData.data.SetUpService.mutation === 'CREATED') {
  //         const newLocation = subscriptionData.data.SetUpService.node;
  //         const locations = previousState.allOilAccountStates.concat([newLocation]);
  //         return {
  //           allOilAccountStates: locations,
  //         }
  //       }
  //       else if (subscriptionData.data.SetUpService.mutation === 'UPDATED') {
  //         const locations = previousState.allOilAccountStates.slice();
  //         const updatedLocation = subscriptionData.data.SetUpService.node.service.location;
  //         const oldLocationIndex = locations.findIndex(location => {
  //           return updatedLocation.id === location.id
  //         });
  //         locations[oldLocationIndex] = updatedLocation;
  //         return {
  //           allOilAccountStates: locations,
  //         }
  //       }

  //       return previousState
        
  //     }
  //   });
    
  // }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
    if (nextProps.allLocations) {
      const newMarkers = nextProps.allLocations.map(location => {
        const isOwnMarker = location.id === this.state.location
        return {
          id: location.id,
          locationName: isOwnMarker ? location.oilService.service.location.locationName + ' (You)' : location.oilService.service.location.locationName,
          street: location.oilService.service.location.street,
          city: location.oilService.service.location.city,
          state: location.oilService.service.location.state,
          position: {
            lat: location.oilService.service.location.lat,
            lng: location.oilService.service.location.lng,
          },
        }
      });
      this.setState({
        markers: newMarkers,
        truckName: newMarkers
      })
    }

  }

  // _removeAllMarkers() {
  //   const newMarkers = this.state.markers.slice();
  //   newMarkers.forEach(marker => {
  //     marker.showInfo = false
  //   })
  //   this.setState({
  //     markers: newMarkers,
  //   })
  // }
  //
  // _updateExistingCustomer = async (customerId) => {
  //
  //   this.setState({
  //     customerId: customerId
  //   });
  //
  //   // Check for customer with this Id
  //   const customerForIdResponse = await this.props.client.query(
  //     {
  //       query: customerForId,
  //       variables: {
  //         id: customerId,
  //       },
  //     }
  //   );
  //
  //   console.log('Update existing customer: ', customerForIdResponse);
  //   const existingCustomer = customerForIdResponse.data.Customer;
  //   console.log('existingCustomer: ', existingCustomer)
  //
  // };

  handleMapLoad = this.handleMapLoad.bind(this);
  handleMapClick = this.handleMapClick.bind(this);
  handleMarkerClick = this.handleMarkerClick.bind(this);
  handleMarkerClose = this.handleMarkerClose.bind(this);

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

  handleMapClick() {
    this._removeAllMarkers()
  }

  render() {
    // console.log(this.state)
    // console.log(this.props)
    return (
      <div style={{height: `100%`}}>
        <FetchV2GoogleMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCCH6ORS-0oa4Jj3uy7DrB2cXPqMEu7Tgg"
          loadingElement={
            <div style={{height: `600px`}}>
              Loading
            </div>
          }
          containerElement={
            <div style={{ height: `600px` }} />
          }
          mapElement={
            <div style={{ height: `600px` }} />
          }
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          markers={this.state.markers}
          onMarkerClick={this.handleMarkerClick}
          onMarkerClose={this.handleMarkerClose}
        />
      </div>
    )
  }
}



export default withApollo(
  graphql(allOilCollectionServices, {name: 'PendingPickups'})(OilCollectionPendingPickUpsMap)
)