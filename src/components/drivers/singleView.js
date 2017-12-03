import React, { Component } from 'react';
import { DriverCardWrapper } from './driverCard.style';

export default class SingleDriverView extends Component {
  render() {
    const { driver, otherAttributes } = this.props;
    const name = driver.user.username ? driver.user.username : 'No Name';
    const extraInfos = [];
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
    return (
      <DriverCardWrapper className="DriverCard">
        <div className="DriverCardHead">
          <div className="PersonImage">
            {driver.avatar ? <img alt="#" src={driver.avatar} /> : ''}
          </div>
          <h1 className="PersonName">
            {name}
          </h1>
        </div>
        <div className="DriverInfoWrapper">
          {extraInfos}
        </div>
      </DriverCardWrapper>
    );
  }
}
