import React, { Component } from 'react';
import { SetUpCardWrapper } from './setUpCard.style';
import { FormattedDate, IntlProvider } from 'react-intl'
import SingleSetUpMap from '../maps/setups/singleSetUpMap'
export default class SingleSetUpView extends Component {


  renderSetUpNote() {
    const { setup } = this.props;
    const setUpNotes = setup.oilCollectionService.service.setUpService.setUpNotes
    console.log("Notes", setUpNotes)
    return setUpNotes.map(({ id, setUpNoteContent }) => {
      return(
        <p key={id} className="SetUpInfoDetails">
          {setUpNoteContent}
        </p>
      )
    })
  }
  
  render() {
    console.log("Single View", this.props)
    const { setup, containerAttributes, setUpAttributes } = this.props;
    const location = setup.oilCollectionService.service.location
    const containment = setup.oilCollectionService.containment
    const setUpDetails = setup.oilCollectionService.service.setUpService
    const name = location.locationName ? location.locationName : 'No Name';
    const extraInfos = [];
    const setUpInfos = [];
    setUpAttributes.forEach(attribute => {
      const value = setUpDetails[attribute.value]
      if (value) {
        setUpInfos.push(
          <div className="SetUpCardInfos" key={attribute.value}>
            <p className="SetUpInfoLabel">{`${attribute.title}`}</p>
            <p className="SetUpInfoDetails">
              <IntlProvider locale="en">
                  <FormattedDate
                    value={value}
                    year='numeric'
                    month='long'
                    day='numeric'
                  />
              </IntlProvider>
            </p>
          </div>
        );
      }
    });
    containerAttributes.forEach(attribute => {
      const value = containment[attribute.value];
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
          <div className="SetUpMap">
            <SingleSetUpMap 
              markers={location}
            />
          </div>
          <h1 className="SetUpName">{name}</h1>
        </div>
        <div className="SetUpInfoWrapper"> 
          {setUpInfos}
          {extraInfos}
          <div className="SetUpCardInfos">
            <p className="SetUpInfoLabel">Notes</p>
              {this.renderSetUpNote()}
          </div>
        </div>
      </SetUpCardWrapper>
      
    );
  }
}
