import React from 'react'
import { Input } from 'antd'

class CustomerForm extends React.Component {

  onFieldChange(event) {
    // for a regular input field, read field name and value from the event
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    this.props.onChange(fieldName, fieldValue);
  }

  render() {

    return(
      <div>
        <Input 
        placeholder='First Name'
        style={{ marginBottom: '15px' }} 
        name="firstName"
        onChange={this.onFieldChange.bind(this)}
        />
        <Input 
          placeholder='Last Name' 
          style={{ marginBottom: '15px' }}
          name="lastName"
          onChange={this.onFieldChange.bind(this)}
        />
        <Input 
          placeholder='Phone'
          style={{ marginBottom: '15px' }} 
          name="phone"
          onChange={this.onFieldChange.bind(this)}
        />
        <Input 
          placeholder='Email' 
          style={{ marginBottom: '15px' }}
          name="email"
          onChange={this.onFieldChange.bind(this)}
          />
          <Input 
          placeholder='Role' 
          style={{ marginBottom: '15px' }}
          name="role"
          onChange={this.onFieldChange.bind(this)}
          />
          <Input 
          placeholder='Notes' 
          style={{ marginBottom: '15px' }}
          name="customerNotes"
          onChange={this.onFieldChange.bind(this)}
          />
      </div>
  

    )
  }
}

export default CustomerForm