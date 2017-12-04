import React from 'react';
import { Input } from 'antd';
import DeleteButton from './deleteButton';
import { FormattedDate, IntlProvider } from 'react-intl'
import { PropTypes } from "prop-types";
import { ServiceListWrapper } from './serviceList.style';


const Search = Input.Search;

function filterServices(services, search) {
  search = search.toUpperCase();
  return search
    ? services.filter(service => service.location.locationName.toUpperCase().includes(search))
    : services;
}

export default class ServiceList extends React.Component {
  constructor(props) {
    super(props);
    this.singleService = this.singleService.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      search: '',
    };
  }
  singleService(service) {
    const { selectedId, deleteService, changeService } = this.props;
    const activeClass = selectedId === service.id ? 'active' : '';
    const name = service.location.locationName
    const setUpDate = service.setUpService.actualSetUpDate
    const onChange = () => changeService(service.id);
    return (
      <div
        key={service.id}
        className={`${activeClass} SingleService`}
        onClick={onChange}
      >
        <div className="Avatar">
          {service.image ? <img alt="#" src={service.image} /> : ''}
        </div>
        <div className="ServiceName">
          <h3>{name ? name : 'No Name'}</h3>
          <h4>Date: <IntlProvider locale="en">
                  <FormattedDate
                    value={setUpDate}
                    year='numeric'
                    month='long'
                    day='numeric'
                  />
              </IntlProvider></h4>
        </div>
        <DeleteButton deleteService={deleteService} service={service} />
      </div>
    );
  }
  onChange(event) {
    this.setState({ search: event.target.value });
  }
  render() {
    const { search } = this.state;
    const services = filterServices(this.props.services, search); 
    console.log("Services: ", services)   
    return(
      <ServiceListWrapper className="ServiceListWrapper">
        <Search
          placeholder={this.context.intl.formatMessage({id:"servicelist.searchServices"})}
          value={search}
          onChange={this.onChange}
          className="SearchBar"
        />
        {services && services.length > 0
          ? <div className="ServiceList">
              {services.map(service => this.singleService(service))}
            </div>
          : 'No Location with that name found...'}
      </ServiceListWrapper>
    )
  }
}

ServiceList.contextTypes ={
  intl: PropTypes.object.isRequired
 }