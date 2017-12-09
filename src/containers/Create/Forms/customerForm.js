import React from 'react'
import { Input } from 'antd'
import { FormCardWrapper } from './formCard.style';

class CustomerForm extends React.Component {

  onFieldChange(event) {
    // for a regular input field, read field name and value from the event
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    this.props.onChange(fieldName, fieldValue);
  }

  render() {

    return (
      <FormCardWrapper className="FormCard">
        <div className="FormInfoWrapper">
          <div className="FormCardInfos">
            <p className="FormInfoLabel">First Name</p>
            <Input 
              placeholder='First Name'
              style={{ marginBottom: '15px' }} 
              name="firstName"
              onChange={this.onFieldChange.bind(this)}
            />
          </div>
          <div className="FormCardInfos">
            <p className="FormInfoLabel">Last Name</p>
            <Input 
              placeholder='Last Name' 
              style={{ marginBottom: '15px' }}
              name="lastName"
              onChange={this.onFieldChange.bind(this)}
            />
          </div>
          <div className="FormCardInfos">
            <p className="FormInfoLabel">Phone</p>
            <Input 
              placeholder='Phone'
              style={{ marginBottom: '15px' }} 
              name="phone"
              onChange={this.onFieldChange.bind(this)}
            />
          </div>
          <div className="FormCardInfos">
            <p className="FormInfoLabel">Email</p>
            <Input 
              placeholder='Email' 
              style={{ marginBottom: '15px' }}
              name="email"
              onChange={this.onFieldChange.bind(this)}
            />
          </div>
          <div className="FormCardInfos">
            <p className="FormInfoLabel">Role</p>
            <Input 
              placeholder='Role' 
              style={{ marginBottom: '15px' }}
              name="role"
              onChange={this.onFieldChange.bind(this)}
            />
          </div>
          <div className="FormCardInfos">
            <p className="FormInfoLabel">Role</p>
            <Input 
              placeholder='Notes' 
              type="textarea" 
              rows={10} 
              autosize={{ minRows: 3, maxRows: 5 }}
              style={{ marginBottom: '15px' }}
              name="customerNotes"
              onChange={this.onFieldChange.bind(this)}
            />
          </div>
        </div>
      </FormCardWrapper>
    );
  }
}

export default CustomerForm



