import React, { Component } from 'react';
import IntlMessages from '../utility/intlMessages';
import { InputSearch } from '../uielements/input';
import DeleteButton from './deleteButton';
import { PropTypes } from 'prop-types';
import { TruckListWrapper } from './truckList.style';

function filterTrucks(trucks, search) {
  search = search.toUpperCase();
  return search
    ? trucks.filter(truck => truck.name.toUpperCase().includes(search))
    : trucks;
}

export default class TruckList extends Component {
  constructor(props) {
    super(props);
    this.singleTruck = this.singleTruck.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      search: ''
    };
  }
  singleTruck(truck) {
    const { selectedId, deleteTruck, changeTruck } = this.props;
    const activeClass = selectedId === truck.id ? 'active' : '';
    const onChange = () => changeTruck(truck.id);
    return (
      <div
        key={truck.id}
        className={`${activeClass} SingleTruck`}
        onClick={onChange}
      >
        <div className="Avatar">
          {truck.image ? <img alt="#" src={truck.image} /> : ''}
        </div>
        <div className="TruckName">
          <h3>{truck.name ? truck.name : 'No Name'}</h3>
        </div>
        <DeleteButton deleteTruck={deleteTruck} truck={truck} />
      </div>
    );
  }
  onChange(event) {
    this.setState({ search: event.target.value });
  }
  render() {
    const { search } = this.state;
    const trucks = filterTrucks(this.props.trucks, search);
    return (
      <TruckListWrapper className="TruckListWrapper">
        <InputSearch
          placeholder={this.context.intl.formatMessage({
            id: 'trucklist.searchTrucks'
          })}
          value={search}
          onChange={this.onChange}
          className="SearchBar"
        />
        {trucks && trucks.length > 0 ? (
          <div className="TruckList">
            {trucks.map(truck => this.singleTruck(truck))}
          </div>
        ) : (
          <span className="NoResultMsg">
            {<IntlMessages id="Component.trucks.noOption" />}
          </span>
        )}
      </TruckListWrapper>
    );
  }
}

TruckList.contextTypes = {
  intl: PropTypes.object.isRequired
};
