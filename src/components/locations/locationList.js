import React from 'react';
import { Input } from 'antd';
import DeleteButton from './deleteButton';
import { PropTypes } from "prop-types";
import { LocationListWrapper } from './locationList.style';


const Search = Input.Search;

function filterLocations(locations, search) {
  search = search.toUpperCase();
  return search
    ? locations.filter(location => location.locationName.toUpperCase().includes(search))
    : locations;
}

export default class LocationList extends React.Component {
  constructor(props) {
    super(props);
    this.singleLocation = this.singleLocation.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      search: '',
    };
  }
  singleLocation(location) {
    const { selectedId, deleteLocation, changeLocation } = this.props;
    const activeClass = selectedId === location.id ? 'active' : '';
    const onChange = () => changeLocation(location.id);
    return (
      <div
        key={location.id}
        className={`${activeClass} SingleLocation`}
        onClick={onChange}
      >
        <div className="Avatar">
          {location.image ? <img alt="#" src={location.image} /> : ''}
        </div>
        <div className="LocationName">
          <h3>{location.locationName ? location.locationName : 'No Name'}</h3>
        </div>
        <DeleteButton deleteLocation={deleteLocation} location={location} />
      </div>
    );
  }
  onChange(event) {
    this.setState({ search: event.target.value });
  }
  render() {
    const { search } = this.state;
    const locations = filterLocations(this.props.locations, search);    
    return(
      <LocationListWrapper className="LocationListWrapper">
        <Search
          placeholder={this.context.intl.formatMessage({id:"locationlist.searchLocations"})}
          value={search}
          onChange={this.onChange}
          className="SearchBar"
        />
        {locations && locations.length > 0
          ? <div className="LocationList">
              {locations.map(location => this.singleLocation(location))}
            </div>
          : 'No Location with that name found...'}
      </LocationListWrapper>
    )
  }
}

LocationList.contextTypes ={
  intl: PropTypes.object.isRequired
 }