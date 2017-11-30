import React from 'react'
import { DatePicker } from 'antd';
import { Select } from 'antd';
const Option = Select.Option;
class OilServiceForm extends React.Component {

  onFieldChange(event) {
    // for a regular input field, read field name and value from the event
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    this.props.onChange(fieldName, fieldValue);
  }

  onDateChange(date) {
    // for a date field, the value is passed into the change handler
    this.props.onDateChange('startDate', date);
}

serviceCycleSelectorChange(value) {
    const fieldName = 'serviceCycle';
    const fieldValue = value;
    this.props.onCycleSelectorChange(fieldName, fieldValue);
    console.log(`selected ${value}`);
}

serviceTypeSelectorChange(value) {
  const fieldName = 'serviceType';
  const fieldValue = value;
  this.props.onServiceTypeSelectorChange(fieldName, fieldValue);
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
        <Select style={{ width: 120 }} onChange={this.serviceCycleSelectorChange.bind(this)}>
          <Option value="7">Weekly</Option>
          <Option value="14">Bi-Weekly</Option>
          <Option value="21">Every Three Weeks</Option>
          <Option value="28">Monthly</Option>
          <Option value="42">Every Six Weeks</Option>
          <Option value="56">Bi-Monthly</Option>
        </Select>
        <Select name='type' style={{ width: 120 }} onChange={this.serviceTypeSelectorChange.bind(this)}>
          <Option value="Automatic">Automatic</Option>
          <Option value="On Call">On Call</Option>
        </Select>
      </div>
  

    )
  }
}

export default OilServiceForm