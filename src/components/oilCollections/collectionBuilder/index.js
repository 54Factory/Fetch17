import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Modal } from 'antd';
import Collection from './collection/collection';
import ContainerOutline from'./container.style';
import BuildControls from './buildControls/buildControls';
import moment from 'moment';
import { CollectionCardWrapper } from '../collectionCard.style';


const MATERIAL_VALUES = {
  oil: 5,
  waste: 5,
  water: 5
};


class CollectionBuilder extends React.Component {

  state = {
    payloads: {
        oil: 0,
        water: 0,
        waste: 0
    },
    totalCollected: 0,
    canCollect: false,
    visible: false
}

onSubmit = async () => {
  const cycle = this.props.collection.serviceCycle
  const oilAmount = this.state.payloads.oil * 5;
  const wasteAmount = this.state.payloads.water * 5;
  const waterAmount = this.state.payloads.waste * 5;
  const futureDate = moment().add(cycle, 'days');
  const scheduleDate = futureDate.toISOString()
  await this.props.UpdateAndCreateCollectionRecord({
    variables: 
      { 
        id: this.props.collection.oilCollectionRecords["0"].id, 
        oilServiceId: this.props.collection.id, 
        oilAmount, 
        wasteAmount, 
        waterAmount ,
        collected: true, 
        scheduledCollectionDate: scheduleDate 
      }});
      this.setState({
        visible: false,
      });
    //this.props.history.push('/dashboard/oilcollection/pendingPickUps')
    window.location.pathname = `/dashboard/oilcollection`
}


showModal = () => {
  this.setState({
    visible: true,
  });
}
handleOk = (e) => {
  console.log(e);
  this.setState({
    visible: false,
  });
}
handleCancel = (e) => {
  console.log(e);
  this.setState({
    visible: false,
  });
}

updateCanCollectState = (payloads) => {

  const sum = Object.keys(payloads)
    .map(payloadKey => {
      return payloads[payloadKey]
    })
    .reduce((sum, el) => {
      return sum + el
    }, 0); 
    this.setState({ canCollect: sum > 0 })
}

addMaterialHandler = (type) => {
  const payloads = {...this.state.payloads};
  payloads[type] += 1;
  const totalCollected = this.state.totalCollected + MATERIAL_VALUES[type];
  this.setState({payloads, totalCollected});
  this.updateCanCollectState(payloads);
  console.log(payloads, totalCollected);
}

removeMaterialHandler = (type) => {
  const payloads = {...this.state.payloads};
  payloads[type] -= 1;
  const totalCollected = this.state.totalCollected - MATERIAL_VALUES[type];
  this.setState({payloads, totalCollected});
  this.updateCanCollectState(payloads);  
  console.log(payloads, totalCollected);
}

  render() {
    console.log(this.state)
    console.log('Collection Builder------>', this.props)
    console.log('Collection Builder--ID Test--->', this.props.collection.oilCollectionRecords["0"].id)
    console.log('Cycle------>', this.props.collection.serviceCycle)
  const disabledInfo = {
      ...this.state.payloads
  };
    for ( let key in disabledInfo ) {
      disabledInfo[key] = disabledInfo[key] <= 0
  }

  const oilGallons = this.state.payloads.oil * 5;
  const waterGallons = this.state.payloads.water * 5;
  const wasteGallons = this.state.payloads.waste * 5;

    return (
      <CollectionCardWrapper className="CollectionCard">
      <div className="CollectionCardHead">
        <div className="CollectionContainerBox">
        <Modal 
          title="Collection Details"
          visible={this.state.visible}
          onOk={this.onSubmit}
          onCancel={this.handleCancel}
        >
        <ContainerOutline>
          <Collection payloads={this.state.payloads} />
        </ContainerOutline>
          <ul>
            <li>For Record ID: {this.props.collection.oilCollectionRecords["0"].id}</li>
            <li>Oil Amount: {oilGallons}</li>
            <li>Water Amount: {waterGallons}</li>
            <li>Waste Amount: {wasteGallons}</li>
            <li>Total Gallons: {this.state.totalCollected}</li>
          </ul>
        </Modal>
        <ContainerOutline>
          <Collection payloads={this.state.payloads} />
        </ContainerOutline>
        </div>
        {/* <h1 className="CollectionName">{name}</h1>
        <p className="CollectionAddress">{streetAddress}</p>
        <p className="CollectionAddress">{restAddress}</p> */}
      </div>
      <div className="CollectionInfoWrapper"> 
        <div className="CollectionCardInfos">
        <BuildControls 
          materialAdded={this.addMaterialHandler}
          materialRemoved={this.removeMaterialHandler}
          disabled={disabledInfo}
          canCollect={this.state.canCollect}
          totalCollected={this.state.totalCollected}
          collected={this.showModal}
        />
        </div>
      </div>
    </CollectionCardWrapper>     
    );
  }
}

const UpdateAndCreateCollectionRecordMutation = gql`
mutation UpdateAndCreateCollectionRecord($id: ID!, $oilServiceId: ID, $scheduledCollectionDate: DateTime, $oilAmount: Int, $wasteAmount: Int, $waterAmount: Int, $collected: Boolean) {
  update: updateOilCollectionRecord(id: $id, oilAmount: $oilAmount, wasteAmount: $wasteAmount, waterAmount: $waterAmount, collected: $collected) {
    id
    oilAmount
    wasteAmount
    waterAmount
    scheduledCollectionDate
    updatedAt
    collected
      
  }
  create: createOilCollectionRecord(oilServiceId: $oilServiceId, scheduledCollectionDate: $scheduledCollectionDate) {
    id
    oilAmount
    wasteAmount
    scheduledCollectionDate
    updatedAt
    collected
  }
}
`
export default graphql(UpdateAndCreateCollectionRecordMutation, {
  name: 'UpdateAndCreateCollectionRecord'
})(CollectionBuilder)



