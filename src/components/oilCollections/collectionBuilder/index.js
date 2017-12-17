import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Modal } from 'antd';
import Collection from './collection/collection';
import ContainerOutline from'./container.style';
import { BuildControls, BuildControlsFiftyFive, BuildControlsOneHundred, BuildControlsOneHundredFifty, BuildControlsTwoHundred, BuildControlsThreeHundred } from './buildControls/buildControls';
import moment from 'moment';
import { CollectionCardWrapper } from '../collectionCard.style';


const MATERIAL_VALUES_55 = {
  oil: 5,
  waste: 5,
  water: 5
};
const MATERIAL_VALUES_100 = {
  oil: 10,
  waste: 10,
  water: 10
};
const MATERIAL_VALUES_150 = {
  oil: 15,
  waste: 15,
  water: 15
};
const MATERIAL_VALUES_200 = {
  oil: 20,
  waste: 20,
  water: 20
};
const MATERIAL_VALUES_300 = {
  oil: 30,
  waste: 30,
  water: 30
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

onSubmitFiftyFive = async () => {
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

onSubmitOneHundred = async () => {
  const cycle = this.props.collection.serviceCycle
  const oilAmount = this.state.payloads.oil * 10;
  const wasteAmount = this.state.payloads.water * 10;
  const waterAmount = this.state.payloads.waste * 10;
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

onSubmitOneHundredFifty = async () => {
  const cycle = this.props.collection.serviceCycle
  const oilAmount = this.state.payloads.oil * 15;
  const wasteAmount = this.state.payloads.water * 15;
  const waterAmount = this.state.payloads.waste * 15;
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

onSubmitTwoHundred = async () => {
  const cycle = this.props.collection.serviceCycle
  const oilAmount = this.state.payloads.oil * 20;
  const wasteAmount = this.state.payloads.water * 20;
  const waterAmount = this.state.payloads.waste * 20;
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

onSubmitThreeHundred = async () => {
  const cycle = this.props.collection.serviceCycle
  const oilAmount = this.state.payloads.oil * 30;
  const wasteAmount = this.state.payloads.water * 30;
  const waterAmount = this.state.payloads.waste * 30;
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

addMaterialHandlerFiftyFive = (type) => {
  const payloads = {...this.state.payloads};
  payloads[type] += 1;
  const totalCollected = this.state.totalCollected + MATERIAL_VALUES_55[type];
  this.setState({payloads, totalCollected});
  this.updateCanCollectState(payloads);
  console.log(payloads, totalCollected);
}

removeMaterialHandlerFiftyFive = (type) => {
  const payloads = {...this.state.payloads};
  payloads[type] -= 1;
  const totalCollected = this.state.totalCollected - MATERIAL_VALUES_55[type];
  this.setState({payloads, totalCollected});
  this.updateCanCollectState(payloads);  
  console.log(payloads, totalCollected);
}
addMaterialHandlerOneHundred = (type) => {
  const payloads = {...this.state.payloads};
  payloads[type] += 1;
  const totalCollected = this.state.totalCollected + MATERIAL_VALUES_100[type];
  this.setState({payloads, totalCollected});
  this.updateCanCollectState(payloads);
  console.log(payloads, totalCollected);
}

removeMaterialHandlerOneHundred = (type) => {
  const payloads = {...this.state.payloads};
  payloads[type] -= 1;
  const totalCollected = this.state.totalCollected - MATERIAL_VALUES_100[type];
  this.setState({payloads, totalCollected});
  this.updateCanCollectState(payloads);  
  console.log(payloads, totalCollected);
}

addMaterialHandlerOneHundredFifty = (type) => {
  const payloads = {...this.state.payloads};
  payloads[type] += 1;
  const totalCollected = this.state.totalCollected + MATERIAL_VALUES_150[type];
  this.setState({payloads, totalCollected});
  this.updateCanCollectState(payloads);
  console.log(payloads, totalCollected);
}

removeMaterialHandlerOneHundredFifty = (type) => {
  const payloads = {...this.state.payloads};
  payloads[type] -= 1;
  const totalCollected = this.state.totalCollected - MATERIAL_VALUES_150[type];
  this.setState({payloads, totalCollected});
  this.updateCanCollectState(payloads);  
  console.log(payloads, totalCollected);
}

addMaterialHandlerTwoHundred = (type) => {
  const payloads = {...this.state.payloads};
  payloads[type] += 1;
  const totalCollected = this.state.totalCollected + MATERIAL_VALUES_200[type];
  this.setState({payloads, totalCollected});
  this.updateCanCollectState(payloads);
  console.log(payloads, totalCollected);
}

removeMaterialHandlerTwoHundred = (type) => {
  const payloads = {...this.state.payloads};
  payloads[type] -= 1;
  const totalCollected = this.state.totalCollected - MATERIAL_VALUES_200[type];
  this.setState({payloads, totalCollected});
  this.updateCanCollectState(payloads);  
  console.log(payloads, totalCollected);
}

addMaterialHandlerThreeHundred = (type) => {
  const payloads = {...this.state.payloads};
  payloads[type] += 1;
  const totalCollected = this.state.totalCollected + MATERIAL_VALUES_300[type];
  this.setState({payloads, totalCollected});
  this.updateCanCollectState(payloads);
  console.log(payloads, totalCollected);
}

removeMaterialHandlerThreeHundred = (type) => {
  const payloads = {...this.state.payloads};
  payloads[type] -= 1;
  const totalCollected = this.state.totalCollected - MATERIAL_VALUES_300[type];
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

    const oilGallonsFiftyFive = this.state.payloads.oil * 5;
    const waterGallonsFiftyFive = this.state.payloads.water * 5;
    const wasteGallonsFiftyFive = this.state.payloads.waste * 5;
    const oilGallonsOneHundred = this.state.payloads.oil * 10;
    const waterGallonsOneHundred = this.state.payloads.water * 10;
    const wasteGallonsOneHundred = this.state.payloads.waste * 10;
    const oilGallonsOneHundredFifty = this.state.payloads.oil * 15;
    const waterGallonsOneHundredFifty = this.state.payloads.water * 15;
    const wasteGallonsOneHundredFifty = this.state.payloads.waste * 15;
    const oilGallonsTwoHundred = this.state.payloads.oil * 20;
    const waterGallonsTwoHundred = this.state.payloads.water * 20;
    const wasteGallonsTwoHundred = this.state.payloads.waste * 20;
    const oilGallonsThreeHundred = this.state.payloads.oil * 30;
    const waterGallonsThreeHundred = this.state.payloads.water * 30;
    const wasteGallonsThreeHundred = this.state.payloads.waste * 30;
    
    const container = this.props.collection.containment.containerType
    console.log("Container Type ---->", container)
    if(container !== '') {
      switch (container) {
        case '55 Gallon Drum':
          console.log('55 Gallon Drum')
          return ( 
            <CollectionCardWrapper className="CollectionCard">
              <div className="CollectionCardHead">
                <div className="CollectionContainerBox">
                <Modal 
                  title="Collection Details"
                  visible={this.state.visible}
                  onOk={this.onSubmitFiftyFive}
                  onCancel={this.handleCancel}
                >
                <ContainerOutline>
                  <Collection payloads={this.state.payloads} />
                </ContainerOutline>
                  <ul>
                    <li>For Record ID: {this.props.collection.oilCollectionRecords["0"].id}</li>
                    <li>Oil Amount: {oilGallonsFiftyFive}</li>
                    <li>Water Amount: {waterGallonsFiftyFive}</li>
                    <li>Waste Amount: {wasteGallonsFiftyFive}</li>
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
                <BuildControlsFiftyFive 
                  materialAdded={this.addMaterialHandlerFiftyFive}
                  materialRemoved={this.removeMaterialHandlerFiftyFive}
                  disabled={disabledInfo}
                  canCollect={this.state.canCollect}
                  totalCollected={this.state.totalCollected}
                  collected={this.showModal}
                />
                </div>
              </div>
            </CollectionCardWrapper>
          )
        case '100 Gallon Container':
          console.log('100 Gallon Container')
          return ( 
            <CollectionCardWrapper className="CollectionCard">
              <div className="CollectionCardHead">
                <div className="CollectionContainerBox">
                <Modal 
                  title="Collection Details"
                  visible={this.state.visible}
                  onOk={this.onSubmitOneHundred}
                  onCancel={this.handleCancel}
                >
                <ContainerOutline>
                  <Collection payloads={this.state.payloads} />
                </ContainerOutline>
                  <ul>
                    <li>For Record ID: {this.props.collection.oilCollectionRecords["0"].id}</li>
                    <li>Oil Amount: {oilGallonsOneHundred}</li>
                    <li>Water Amount: {waterGallonsOneHundred}</li>
                    <li>Waste Amount: {wasteGallonsOneHundred}</li>
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
                <BuildControlsOneHundred 
                  materialAdded={this.addMaterialHandlerOneHundred}
                  materialRemoved={this.removeMaterialHandlerOneHundred}
                  disabled={disabledInfo}
                  canCollect={this.state.canCollect}
                  totalCollected={this.state.totalCollected}
                  collected={this.showModal}
                />
                </div>
              </div>
            </CollectionCardWrapper>
          )
        case '150 Gallon Container':
          console.log('150 Gallon Container')
          return ( 
            <CollectionCardWrapper className="CollectionCard">
              <div className="CollectionCardHead">
                <div className="CollectionContainerBox">
                <Modal 
                  title="Collection Details"
                  visible={this.state.visible}
                  onOk={this.onSubmitOneHundredFifty}
                  onCancel={this.handleCancel}
                >
                <ContainerOutline>
                  <Collection payloads={this.state.payloads} />
                </ContainerOutline>
                  <ul>
                    <li>For Record ID: {this.props.collection.oilCollectionRecords["0"].id}</li>
                    <li>Oil Amount: {oilGallonsOneHundredFifty}</li>
                    <li>Water Amount: {waterGallonsOneHundredFifty}</li>
                    <li>Waste Amount: {wasteGallonsOneHundredFifty}</li>
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
                <BuildControlsOneHundredFifty 
                  materialAdded={this.addMaterialHandlerOneHundredFifty}
                  materialRemoved={this.removeMaterialHandlerOneHundredFifty}
                  disabled={disabledInfo}
                  canCollect={this.state.canCollect}
                  totalCollected={this.state.totalCollected}
                  collected={this.showModal}
                />
                </div>
              </div>
            </CollectionCardWrapper>
          )
        case '200 Gallon Container':
          console.log('200 Gallon Container')
          return ( 
            <CollectionCardWrapper className="CollectionCard">
              <div className="CollectionCardHead">
                <div className="CollectionContainerBox">
                <Modal 
                  title="Collection Details"
                  visible={this.state.visible}
                  onOk={this.onSubmitTwoHundred}
                  onCancel={this.handleCancel}
                >
                <ContainerOutline>
                  <Collection payloads={this.state.payloads} />
                </ContainerOutline>
                  <ul>
                    <li>For Record ID: {this.props.collection.oilCollectionRecords["0"].id}</li>
                    <li>Oil Amount: {oilGallonsTwoHundred}</li>
                    <li>Water Amount: {waterGallonsTwoHundred}</li>
                    <li>Waste Amount: {wasteGallonsTwoHundred}</li>
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
                <BuildControlsTwoHundred 
                  materialAdded={this.addMaterialHandlerTwoHundred}
                  materialRemoved={this.removeMaterialHandlerTwoHundred}
                  disabled={disabledInfo}
                  canCollect={this.state.canCollect}
                  totalCollected={this.state.totalCollected}
                  collected={this.showModal}
                />
                </div>
              </div>
            </CollectionCardWrapper>
          )
        case '300 Gallon Container':
          console.log('300 Gallon Container')
          return ( 
            <CollectionCardWrapper className="CollectionCard">
              <div className="CollectionCardHead">
                <div className="CollectionContainerBox">
                <Modal 
                  title="Collection Details"
                  visible={this.state.visible}
                  onOk={this.onSubmitThreeHundred}
                  onCancel={this.handleCancel}
                >
                <ContainerOutline>
                  <Collection payloads={this.state.payloads} />
                </ContainerOutline>
                  <ul>
                    <li>For Record ID: {this.props.collection.oilCollectionRecords["0"].id}</li>
                    <li>Oil Amount: {oilGallonsThreeHundred}</li>
                    <li>Water Amount: {waterGallonsThreeHundred}</li>
                    <li>Waste Amount: {wasteGallonsThreeHundred}</li>
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
                <BuildControlsThreeHundred 
                  materialAdded={this.addMaterialHandlerThreeHundred}
                  materialRemoved={this.removeMaterialHandlerThreeHundred}
                  disabled={disabledInfo}
                  canCollect={this.state.canCollect}
                  totalCollected={this.state.totalCollected}
                  collected={this.showModal}
                />
                </div>
              </div>
            </CollectionCardWrapper>
          )
        default:
          console.log('Container Type Missing')
          return ( 
            <CollectionCardWrapper className="CollectionCard">
              <div className="CollectionCardHead">
                <div className="CollectionContainerBox">
                <Modal 
                  title="Collection Details"
                  visible={this.state.visible}
                  onOk={this.onSubmitFiftyFive}
                  onCancel={this.handleCancel}
                >
                <ContainerOutline>
                  <Collection payloads={this.state.payloads} />
                </ContainerOutline>
                  <ul>
                    <li>For Record ID: {this.props.collection.oilCollectionRecords["0"].id}</li>
                    <li>Oil Amount: {oilGallonsFiftyFive}</li>
                    <li>Water Amount: {waterGallonsFiftyFive}</li>
                    <li>Waste Amount: {wasteGallonsFiftyFive}</li>
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
          )
      }
    }
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



