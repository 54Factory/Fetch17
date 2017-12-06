import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
//import { FormattedDate, IntlProvider } from 'react-intl';
//import IntlMessages from '../../utility/intlMessages';
import { Select } from 'antd';
import Button from '../../uielements/button';
import {Input} from 'antd';
import SingleAssignmentMap from '../../maps/oilcollection/assignment/singleAssignmentMap'
import { CollectionCardWrapper } from '.././collectionCard.style';


const InputGroup = Input.Group;
const Option = Select.Option;


class AssignView extends Component {

  constructor(props) {
    super(props);
    this.state = {truckTruckId: ''};

    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(value) {
    console.log(`selected ${value}`);
    this.setState({truckTruckId: value})
    
  }
  
  render() {
    console.log("Single View", this.props)
    console.log("State View", this.state)
    const { collection, trucks } = this.props;
    const location = collection.oilCollectionService.service.location
    //const containment = collection.oilCollectionService.containment
    //const setUpDetails = collection.oilCollectionService.service.setUpService
    //const truck = collection.oilCollectionService.service.setUpService.truck
    //const driver = collection.oilCollectionService.service.setUpService.truck.driver.user
    const name = location.locationName ? location.locationName : 'No Name';
    const streetAddress = location.streetNumber + ' ' + location.street;
    const restAddress = `${location.city}, ${location.state} ${location.zip}`
    // const extraInfos = [];
    // const setUpInfos = [];
    // setUpAttributes.forEach(attribute => {
    //   const value = setUpDetails[attribute.value]
    //   if (value) {
    //     setUpInfos.push(
    //       <div className="CollectionCardInfos" key={attribute.value}>
    //         <p className="CollectionInfoLabel">{`${attribute.title}`}</p>
    //         <p className="CollectionInfoDetails">
    //           <IntlProvider locale="en">
    //               <FormattedDate
    //                 value={value}
    //                 year='numeric'
    //                 month='long'
    //                 day='numeric'
    //               />
    //           </IntlProvider>
    //         </p>
    //       </div>
    //     );
    //   }
    // });
    // containerAttributes.forEach(attribute => {
    //   const value = containment[attribute.value];
    //   if (value) {
    //     extraInfos.push(
    //       <div className="CollectionCardInfos" key={attribute.value}>
    //         <p className="CollectionInfoLabel">{`${attribute.title}`}</p>
    //         <p className="CollectionInfoDetails">
    //           {value}
    //         </p>
    //       </div>
    //     );
    //   }
    // });
    // truckAttributes.forEach(attribute => {
    //   const value = trucks[attribute.value];
    //   if (value) {
    //     extraInfos.push(
    //       <div className="CollectionCardInfos" key={attribute.value}>
    //         <p className="CollectionInfoLabel">{`${attribute.title}`}</p>
    //         <p className="CollectionInfoDetails">
    //           {value}
    //         </p>
    //       </div>
    //     );
    //   }
    // });
    return (
      <CollectionCardWrapper className="CollectionCard">
        <div className="CollectionCardHead">
          <div className="CollectionMap">
            <SingleAssignmentMap 
              markers={location}
            />
          </div>
          <h1 className="CollectionName">{name}</h1>
          <p className="CollectionAddress">{streetAddress}</p>
          <p className="CollectionAddress">{restAddress}</p>
        </div>
        <div className="CollectionInfoWrapper"> 
        <InputGroup size="large" style={{ marginBottom: '15px' }}>
          <Select 
            style={{ width: '100%', marginBottom: '15px' }} 
            placeholder="Select Truck" 
            onChange={this.handleChange}
          >
          {trucks.map(({ id, name }) => 
            <Option key={id} value={id}>{name}</Option>
          )}
          </Select>
        </InputGroup> 
        <div>
          <Button onClick={this.onSubmit} className="AssignBtn" type="primary">Assign Truck</Button>
          </div>
        </div>
      </CollectionCardWrapper>
      
    );
  }
  onSubmit = async () => {
    const { truckTruckId } = this.state;
    await this.props.AssignTruckToAccount({variables: { id: this.props.collection.id, truckTruckId, oilCollectionServicesOilCollectionServiceId: this.props.collection.oilCollectionService.id }});

     //window.location.pathname = `/dashboard/oilcollection/unassigned`
     window.location.reload()
  }
}

const OilCollectionAssignTruckMutation = gql`
mutation AssignTruckToAccount($truckTruckId: ID!, $oilCollectionServicesOilCollectionServiceId: ID!, $id: ID!) {
  AssignTruck: addToOilCollectionServiceOnTruck(truckTruckId: $truckTruckId, oilCollectionServicesOilCollectionServiceId: $oilCollectionServicesOilCollectionServiceId) {
    truckTruck{
      id
      name
    }
    oilCollectionServicesOilCollectionService {
      id
    }
  }
  UpdateOilAccountState: updateOilCollectionState(id: $id, active: true, setup: true, suspended: false) {
    id
    active
    setup
  }
}
`

const AssignTruckToAccountPageWithUpdate = graphql(OilCollectionAssignTruckMutation, {
  name: 'AssignTruckToAccount'
})(AssignView)

export default AssignTruckToAccountPageWithUpdate