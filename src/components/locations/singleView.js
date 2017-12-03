import React, { Component } from 'react';
import { LocationCardWrapper } from './locationCard.style';
import SingleSetUpMap from '../maps/setups/singleSetUpMap'

export default class SingleLocationView extends Component {
  render() {
    const { location, otherAttributes } = this.props;
    const name = location.locationName ? location.locationName : 'No Name';
    const extraInfos = [];
    otherAttributes.forEach(attribute => {
      const value = location[attribute.value];
      if (value) {
        extraInfos.push(
          <div className="LocationCardInfos" key={attribute.value}>
            <p className="LocationInfoLabel">{`${attribute.title}`}</p>
            <p className="LocationInfoDetails">
              {value}
            </p>
          </div>
        );
      }
    });
    return (
      <LocationCardWrapper className="LocationCard">
        <div className="LocationCardHead">
          <div className="LocationMap">
            <SingleSetUpMap 
              markers={location}
            />
          </div>
          <h1 className="LocationName">
            {name}
          </h1>
        </div>
        <div className="LocationInfoWrapper">
          {extraInfos}
        </div>
      </LocationCardWrapper>
    );
  }
}
