import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as LocationAction from '../../redux/locations/actions';
import { Layout, Icon } from 'antd';
import Button from '../../components/uielements/button';
import LocationList from '../../components/locations/locationList';
import SingleLocationView from '../../components/locations/singleView';
import EditLocationView from '../../components/locations/editView';
import DeleteButton from '../../components/locations/deleteButton';
import IntlMessages from '../../components/utility/intlMessages';
import { LocationsWrapper } from './locations.style';
import LocationsMap from '../../components/maps/locations/locationsMap'
const {
  fetchLocations,
  changeLocation,
  editLocation,
  deleteLocation,
  viewChange,
  viewMap
} = LocationAction;



const { Content } = Layout;
class Locations extends Component {
  componentWillMount() {
    this.props.fetchLocations()
  }
  render() {

    const {    
      locations,
      selectedId,
      editView,
      changeLocation,
      editLocation,
      deleteLocation,
      viewChange,
      viewMap
    } = this.props;
    
    const selectedLocation = selectedId
      ? locations.filter(location => location.id === selectedId)[0]
      : null;
    
      const onViewChange = () => viewChange(!editView);
      const onMapChange = () => viewMap(editView);

    const otherAttributes = [
      { title: 'Number', value: 'streetNumber', type: 'number' },
      { title: 'Street', value: 'street', type: 'address' },
      { title: 'City', value: 'city', type: 'city' },
      { title: 'State', value: 'state', type: 'state' },
      { title: 'Zip', value: 'zip', type: 'zip' }
    ];


    console.log(this.props);
    return (
      <div>
      <LocationsWrapper
        className="Locations"
        style={{ background: 'none' }}
      >        
        <div className="LocationListBar">
          <LocationList
            locations={locations}
            selectedId={selectedId}
            changeLocation={changeLocation}
            deleteLocation={deleteLocation}
          />
        </div>
        <Layout className="LocationBoxWrapper">
          {selectedLocation ? (
            <Content className="LocationBox">
              <div className="LocationControl">
                <Button type="button" onClick={onViewChange}>
                  {editView ? <Icon type="check" /> : <Icon type="edit" />}{' '}
                </Button>
                <DeleteButton
                  deleteLocation={deleteLocation}
                  location={selectedLocation}
                />
                <Button
                  type="primary"
                  onClick={onMapChange}
                  className="BackBtn"
                >
                  <IntlMessages id="locationlist.backButton" />
                </Button>
              </div>
              {editView ? (
                <EditLocationView
                  location={selectedLocation}
                  editLocation={editLocation}
                  otherAttributes={otherAttributes}
                />
              ) : (
                <SingleLocationView
                  location={selectedLocation}
                  otherAttributes={otherAttributes}
                />
                
              )}
            </Content>
          ) : (
            <Content className="LocationBox">
            <LocationsMap 
              markers={locations}
            />
          </Content>
          )}
        </Layout>
      </LocationsWrapper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { locations, selectedId, editView } = state.Locations;
  return {
    locations,
    selectedId,
    editView
  };
}
export default connect(mapStateToProps, {
  fetchLocations,
  changeLocation,
  editLocation,
  deleteLocation,
  viewChange,
  viewMap
})(Locations);
