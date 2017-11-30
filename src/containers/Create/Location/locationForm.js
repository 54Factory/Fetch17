import React from 'react'
import { Input } from 'antd'

class LocationForm extends React.Component {

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
        placeholder='Location Name'
        style={{ marginBottom: '15px' }} 
        name="locationName"
        onChange={this.onFieldChange.bind(this)}
        />
      </div>
  

    )
  }
}

export default LocationForm