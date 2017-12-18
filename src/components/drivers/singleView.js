import React, { Component } from 'react';
import { DriverCardWrapper } from './driverCard.style';

export default class SingleDriverView extends Component {
  render() {
    const { driver, otherAttributes, truckAttributes } = this.props;
    const name = driver.user.username ? driver.user.username : 'No Name';
    const truck = driver.truck
    const extraInfos = [];
    const truckInfos = [];
    otherAttributes.forEach(attribute => {
      const value = driver[attribute.value];
      if (value) {
        extraInfos.push(
          <div className="DriverCardInfos" key={attribute.value}>
            <p className="DriverInfoLabel">{`${attribute.title}`}</p>
            <p className="DriverInfoDetails">
              {value}
            </p>
          </div>
        );
      }
    });
    truckAttributes.forEach(attribute => {

      if (truck != null) {
        const value = truck[attribute.value];
        truckInfos.push(
          <div className="DriverCardInfos" key={attribute.value}>
            <p className="DriverInfoLabel">{`${attribute.title}`}</p>
            <p className="DriverInfoDetails">
              {value}
            </p>
          </div>
        );
      } else {
        const unassignedDriverTruck = "Unassigned!"
        truckInfos.push(
          <div className="DriverCardInfos" key={attribute.value}> 
              <p className="DriverInfoLabel">{`${attribute.title}`}</p>
              <p className="DriverInfoDetails" style={{ color: 'red' }}>
                {unassignedDriverTruck}
              </p>
            </div>
        )
      }

    });
    return (
      <DriverCardWrapper className="DriverCard">
        <div className="DriverCardHead">
          <div className="PersonImage">
            {driver.user.avatar ? <img alt="#" src={driver.user.avatar} /> : ''}
          </div>
          <h1 className="PersonName">
            {name}
          </h1>
        </div>
        <div className="DriverInfoWrapper">
          {extraInfos}
          {truckInfos}
        </div>
      </DriverCardWrapper>
    );
  }
}
