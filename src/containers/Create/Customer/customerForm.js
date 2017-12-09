import React from 'react'
import { Input } from 'antd'
import { CustomerFormCardWrapper } from './customerForm.style'

class CustomerForm extends React.Component {

  onFieldChange(event) {
    // for a regular input field, read field name and value from the event
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    this.props.onChange(fieldName, fieldValue);
  }

  render() {

    return(
      <CustomerFormCardWrapper className="CustomerFormCard">
        <div className="CustomerFormInfoWrapper">
          <div className="CustomerFormCardInfos">
            <p className="CustomerFormInfoLabel">First Name</p>
              <Input 
                placeholder='First Name'
                style={{ marginBottom: '15px' }} 
                name="firstName"
                onChange={this.onFieldChange.bind(this)}
              />
            <p className="CustomerFormInfoLabel">Last Name</p>
              <Input 
                placeholder='Last Name' 
                style={{ marginBottom: '15px' }}
                name="lastName"
                onChange={this.onFieldChange.bind(this)}
              />
            <p className="CustomerFormInfoLabel">Phone</p>
              <Input 
                placeholder='Phone'
                style={{ marginBottom: '15px' }} 
                name="phone"
                onChange={this.onFieldChange.bind(this)}
              />
            <p className="CustomerFormInfoLabel">Email</p>
              <Input 
                placeholder='Email' 
                style={{ marginBottom: '15px' }}
                name="email"
                onChange={this.onFieldChange.bind(this)}
              />   
            <p className="CustomerFormInfoLabel">Role</p>
              <Input 
                placeholder='Role' 
                style={{ marginBottom: '15px' }}
                name="role"
                onChange={this.onFieldChange.bind(this)}
              />
            <p className="CustomerFormInfoLabel">Notes</p>
              <Input 
                placeholder='Notes' 
                style={{ marginBottom: '15px' }}
                name="customerNotes"
                onChange={this.onFieldChange.bind(this)}
              />
          </div>
        </div>                
      </CustomerFormCardWrapper>
    )
  }
}

export default CustomerForm