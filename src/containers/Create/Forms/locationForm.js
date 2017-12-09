import React from 'react'
import { Input } from 'antd'
import { FormCardWrapper } from './formCard.style';

export default class LocationForm extends React.Component {

  onFieldChange(event) {
    // for a regular input field, read field name and value from the event
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    this.props.onChange(fieldName, fieldValue);
  }

  render() {
    const { addressValues } = this.props
    const otherAttributes = [
      { title: 'City', value: 'city', type: 'city' },
      { title: 'State', value: 'state', type: 'state' },
      { title: 'Zip', value: 'zip', type: 'zip' }
    ];
    const extraInfos = [];
    otherAttributes.forEach(attribute => {
      const value = addressValues[attribute.value];
      if (value) {
        extraInfos.push(
          <div className="FormCardInfos" key={attribute.value}>
            <p className="FormInfoLabel">{`${attribute.title}`}</p>
            <p className="FormInfoDetails">
              {value}
            </p>
          </div>
        );
      }
    });
    return (
      <FormCardWrapper className="FormCard">
        <div className="FormInfoWrapper">
          <div className="FormCardInfos">
            <p className="FormInfoLabel">Location Name</p>
            <Input 
              placeholder='Location Name'
              style={{ marginBottom: '15px' }} 
              name="locationName"
              onChange={this.onFieldChange.bind(this)}
            />
          </div>
          <div className="FormCardInfos">
            <p className="FormInfoLabel">Address</p>
            <p className="FormInfoDetails">{`${addressValues.street_number} ${addressValues.street}`}</p>
          </div>
          {extraInfos}
        </div>
      </FormCardWrapper>
    );
  }
}
