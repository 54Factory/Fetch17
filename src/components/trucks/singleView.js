import React, { Component } from 'react';
import { TruckCardWrapper } from './truckCard.style';

export default class SingleTruckView extends Component {
  render() {
    const { truck, otherAttributes } = this.props;
    const name = truck.name ? truck.name : 'No Name';
    const extraInfos = [];
    otherAttributes.forEach(attribute => {
      const value = truck[attribute.value];
      if (value) {
        extraInfos.push(
          <div className="TruckCardInfos" key={attribute.value}>
            <p className="TruckInfoLabel">{`${attribute.title}`}</p>
            <p className="TruckInfoDetails">
              {value}
            </p>
          </div>
        );
      }
    });
    return (
      <TruckCardWrapper className="TruckCard">
        <div className="TruckCardHead">
          <div className="PersonImage">
            {truck.image ? <img alt="#" src={truck.image} /> : ''}
          </div>
          <h1 className="PersonName">
            {name}
          </h1>
        </div>
        <div className="TruckInfoWrapper">
          {extraInfos}
        </div>
      </TruckCardWrapper>
    );
  }
}
