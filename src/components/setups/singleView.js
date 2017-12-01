import React, { Component } from 'react';
import { SetUpCardWrapper } from './setUpCard.style';

export default class SingleSetUpView extends Component {
  render() {
    const { setup, otherAttributes } = this.props;
    const name = setup.locationName ? setup.locationName : 'No Name';
    const extraInfos = [];
    otherAttributes.forEach(attribute => {
      const value = setup[attribute.value];
      if (value) {
        extraInfos.push(
          <div className="SetUpCardInfos" key={attribute.value}>
            <p className="SetUpInfoLabel">{`${attribute.title}`}</p>
            <p className="SetUpInfoDetails">
              {value}
            </p>
          </div>
        );
      }
    });
    return (
      <SetUpCardWrapper className="SetUpCard">
        <div className="SetUpCardHead">
          <div className="SetUpImage">
            {setup.image ? <img alt="#" src={setup.image} /> : ''}
          </div>
          <h1 className="SetUpName">
            {name}
          </h1>
        </div>
        <div className="SetUpInfoWrapper">
          {extraInfos}
        </div>
      </SetUpCardWrapper>
    );
  }
}
