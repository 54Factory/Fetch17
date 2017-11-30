import React from 'react';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag'
import { Layout } from "antd";
import Loading from '../Loading';
import LocationList from '../../components/locations/locationList';
import LocationsMap from '../../components/maps/locations/locationsMap';
import { LocationsWrapper } from './locations.style';

const { Sider, Content } = Layout;

class Locations extends React.Component {

  render() {
    if (this.props.Locations && this.props.Locations.loading) { return (<Loading />)}
    if (this.props.Locations && this.props.Locations.error) { return (<div>Error...</div>)}
    const {
      allLocations
    } = this.props.Locations
    console.log(allLocations);
    return(
      <LocationsWrapper className="isomorphicLocations" style={{ background: "none" }}>
        <Sider width="300" className="isoLocationListBar" >
          <LocationList
            locations={allLocations}
          />
        </Sider>
        <Content>
          <LocationsMap 
            allLocations={allLocations}
          />
        </Content>
      </LocationsWrapper>
    )
  }
}

const LocationQuery = gql`
query Locations {
  allLocations(orderBy: createdAt_DESC) {
    id
    createdAt
    locationName
    street
    city
    state
    zip
    lat
    lng
    customer {
      id
      firstName
      lastName
    }
  }
}
`;

const LocationIndexPageWithData = withApollo(graphql(LocationQuery, {
  name: 'Locations',
  options: {
    fetchPolicy: 'network-only'
  },
})(Locations));

export default LocationIndexPageWithData


