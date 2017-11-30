import React from 'react';
import { InputSearch } from '../uielements/input';
import { Link } from 'react-router-dom'
import { CustomerListWrapper } from './customerList.style';

import { PropTypes } from "prop-types";

function filterCustomers(customers, search) {
  search = search.toUpperCase();
  return search
    ? customers.filter(customer => customer.lastName.toUpperCase().includes(search))
    : customers;
}

export default class CustomerList extends React.Component {
  constructor(props) {
    super(props);
    this.singleCustomer = this.singleCustomer.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      search: '',
    };
  }
  singleCustomer(customer) {
    const { selectedId } = this.props;
    const activeClass = selectedId === customer.id ? 'active' : '';
    return (
      <div
        key={customer.id}
        className={`${activeClass} isoSingleCustomer`}
      >
      <Link to={`/dashboard/customers/${customer.id}`} >
        <div className="isoCustomerName">
          <h3>{`${customer.firstName} ${customer.lastName}` ? `${customer.firstName} ${customer.lastName}` : 'No Name'}</h3>
        </div>
      </Link>
        
      </div>
    );
  }
  onChange(event) {
    this.setState({ search: event.target.value });
  }
  render() {
    const { search } = this.state;
    const customers = filterCustomers(this.props.customers, search);    
    return(
      <CustomerListWrapper className="isoCustomerListWrapper">
        <InputSearch
          placeholder={this.context.intl.formatMessage({id:"customerlist.searchCustomers"})}
          value={search}
          onChange={this.onChange}
          className="isoSearchBar"
        />
        {customers && customers.length > 0
          ? <div className="isoCustomerList">
              {customers.map(customer => this.singleCustomer(customer))}
            </div>
          : 'No Customer with that Last Name found'}
      </CustomerListWrapper>
    )
  }
}

CustomerList.contextTypes ={
  intl: PropTypes.object.isRequired
 }