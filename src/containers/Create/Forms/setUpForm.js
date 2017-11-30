import React from 'react'
import { DatePicker } from 'antd';
import { Select } from 'antd';
const Option = Select.Option;
class SetUpForm extends React.Component {

  onFieldChange(event) {
    // for a regular input field, read field name and value from the event
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    this.props.onChange(fieldName, fieldValue);
  }

  onDateChange(date) {
    // for a date field, the value is passed into the change handler
    this.props.onDateChange('setUpDate', date);
}

  quantitySelectorChange(value) {
    const fieldName = 'quantity';
    const fieldValue = value;
    this.props.onQuantitySelectorChange(fieldName, fieldValue);
    console.log(`selected ${value}`);
}

containerTypeSelectorChange(value) {
  const fieldName = 'containerType';
  const fieldValue = value;
  this.props.onContainerTypeSelectorChange(fieldName, fieldValue);
  console.log(`selected ${value}`);
}

  render() {

    return(
      <div>
        <DatePicker 
          onChange={this.onDateChange.bind(this)} 
          showToday={true}
          format='MMMM Do YYYY'
          allowClear={false}
        />
        <Select style={{ width: 120 }} onChange={this.quantitySelectorChange.bind(this)}>
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
        </Select>
        <Select name='type' style={{ width: 120 }} onChange={this.containerTypeSelectorChange.bind(this)}>
          <Option value="55 Gallon Drum">55 Gallon Drum</Option>
          <Option value="150 Gallon Container">150 Gallon Container</Option>
        </Select>
        {/* <Input 
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
          /> */}
      </div>
  

    )
  }
}

export default SetUpForm