import React from 'react';
import { connect } from 'react-redux';
import * as SetUpTruckAction from '../../../redux/trucks/setUpTruck/actions'
import { Select, Input, DatePicker } from 'antd';
import { FormCardWrapper } from './formCard.style';

const Option = Select.Option;


const { 
  fetchSetUpTruck
} = SetUpTruckAction;

class SetUpForm extends React.Component {

  componentWillMount() {
    this.props.fetchSetUpTruck()
    this.handleTruckId()
  }

  handleTruckId() {
    if(this.props.fetched) {
      const truckId = this.props.setUpTrucks['0'].truck.id
      this.props.getTruckId(truckId)
    }
  }

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
    console.log(this.props)
    return(
        <FormCardWrapper className="FormCard">
        <div className="FormInfoWrapper">
          <div className="FormCardInfos">
            <p className="FormInfoLabel">Set Up Date</p>
            <DatePicker 
              onChange={this.onDateChange.bind(this)} 
              showToday={true}
              format='MMMM Do YYYY'
              allowClear={false}
            />
          </div>
          <div className="FormCardInfos">
            <p className="FormInfoLabel">No. of Containers</p>
            <Select style={{ width: "100%" }} onChange={this.quantitySelectorChange.bind(this)}>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
            </Select>
          </div>
          <div className="FormCardInfos">
            <p className="FormInfoLabel">Container Type</p>
            <Select name='type' style={{ width: "100%" }} onChange={this.containerTypeSelectorChange.bind(this)}>
              <Option value="55 Gallon Drum">55 Gallon Drum</Option>
              <Option value="100 Gallon Container">100 Gallon Container</Option>
              <Option value="150 Gallon Container">150 Gallon Container</Option>
              <Option value="200 Gallon Container">200 Gallon Container</Option>
              <Option value="300 Gallon Container">300 Gallon Container</Option>
            </Select>
          </div>
          <div className="FormCardInfos">
            <p className="FormInfoLabel">Set Up Notes</p>
            <Input 
              placeholder='Notes' 
              type="textarea" 
              rows={10} 
              autosize={{ minRows: 3, maxRows: 5 }}
              style={{ marginBottom: '15px' }}
              name="setUpNoteContent"
              onChange={this.onFieldChange.bind(this)}
            />
          </div>
        </div>
        </FormCardWrapper>
    )
  }
}

function mapStateToProps(state) {
  const { setUpTrucks, fetched } = state.SetUpTruck
  return {
    setUpTrucks,
    fetched
  }
}

export default connect(mapStateToProps, { fetchSetUpTruck })(SetUpForm)