import React, { Component } from 'react';
import Collection from './collection/collection'
import ContainerOutline from'./container.style'
import BuildControls from './buildControls/buildControls'
import { CollectionCardWrapper } from '../collectionCard.style';


const MATERIAL_VALUES = {
  oil: 5,
  waste: 5,
  water: 5
};

class CollectionBuilder extends Component {

  state = {
    payloads: {
        oil: 0,
        water: 0,
        waste: 0
    },
    totalCollected: 0
}

// handleChange = (type) => {

//   const newState = {...this.state.someProperty, flag: value}
//   this.setState({ someProperty: newState })
// }

addMaterialHandler = (type) => {
  const payloads = {...this.state.payloads};
  payloads[type] += 1;
  const totalCollected = this.state.totalCollected + MATERIAL_VALUES[type];
  this.setState({payloads, totalCollected});
  console.log(payloads, totalCollected);
}

// addMaterialHandler(type) {
//   const oldCount = this.state.payloads[type];
//   const updatedCount = oldCount + 1
//   const updatedMaterials = {
//     ...this.state.payloads[type]
//   };
//   updatedMaterials[type] = updatedCount
//   // const collectedTotal = this.state.payloads[type]
//   // const oldTotalCollected = this.state.totalCollected;
//   // const updatedTotal = oldTotalCollected + collectedTotal
//     this.setState({
//       payloads: updatedMaterials
//     })
// }

removeMaterialHandler = (type) => {
  const payloads = {...this.state.payloads};
  payloads[type] -= 1;
  const totalCollected = this.state.totalCollected - MATERIAL_VALUES[type];
  this.setState({payloads, totalCollected});
  console.log(payloads, totalCollected);
}

  render() {
  const disabledInfo = {
      ...this.state.payloads
  };
    for ( let key in disabledInfo ) {
      disabledInfo[key] = disabledInfo[key] <= 0
  }
  return (
    <CollectionCardWrapper className="CollectionCard">
    <div className="CollectionCardHead">
      <div className="CollectionContainerBox">
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
      totalCollected={this.state.totalCollected}
    />
      </div>
    </div>
  </CollectionCardWrapper>
        
  );
    // return (
    //   <div>
    //     <div>
    //     <ContainerOutline>
    //       <Collection payloads={this.state.payloads} />
    //     </ContainerOutline>
    //     </div>
    //     <div>
    //     <BuildControls 
    //       materialAdded={this.addMaterialHandler}
    //       materialRemoved={this.removeMaterialHandler}
    //       disabled={disabledInfo}
    //       totalCollected={this.state.totalCollected}
    //     />
    //     </div>
    //   </div>         
    // );
  }
}

export default CollectionBuilder