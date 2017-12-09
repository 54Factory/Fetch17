import React, { Component } from 'react';
import IntlMessages from '../utility/intlMessages';
import { InputSearch } from '../uielements/input';
//import DeleteButton from './deleteButton';
import { PropTypes } from 'prop-types';
import { DriverListWrapper } from './driverList.style';

function filterDrivers(drivers, search) {
  search = search.toUpperCase();
  return search
    ? drivers.filter(driver => driver.user.username.toUpperCase().includes(search))
    : drivers;
}

export default class DriverList extends Component {
  constructor(props) {
    super(props);
    this.singleDriver = this.singleDriver.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      search: ''
    };
  }
  singleDriver(driver) {
    const { selectedId, changeDriver } = this.props;
    const activeClass = selectedId === driver.id ? 'active' : '';
    const onChange = () => changeDriver(driver.id);
    return (
      <div
        key={driver.id}
        className={`${activeClass} SingleDriver`}
        onClick={onChange}
      >
        <div className="Avatar">
          {driver.image ? <img alt="#" src={driver.image} /> : ''}
        </div>
        <div className="DriverName">
          <h3>{driver.user.username ? driver.user.username : 'No Name'}</h3>
        </div>
        {/* <DeleteButton deleteDriver={deleteDriver} driver={driver} /> */}
      </div>
    );
  }
  onChange(event) {
    this.setState({ search: event.target.value });
  }
  render() {
    console.log(this.props)
    const { search } = this.state;
    const drivers = filterDrivers(this.props.drivers, search);
    return (
      <DriverListWrapper className="DriverListWrapper">
        <InputSearch
          placeholder={this.context.intl.formatMessage({
            id: 'driverlist.searchDrivers'
          })}
          value={search}
          onChange={this.onChange}
          className="SearchBar"
        />
        {drivers && drivers.length > 0 ? (
          <div className="DriverList">
            {drivers.map(driver => this.singleDriver(driver))}
          </div>
        ) : (
          <span className="NoResultMsg">
            {<IntlMessages id="Component.drivers.noOption" />}
          </span>
        )}
      </DriverListWrapper>
    );
  }
}

DriverList.contextTypes = {
  intl: PropTypes.object.isRequired
};
