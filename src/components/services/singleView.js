import React, { Component } from 'react';
import { ServiceCardWrapper } from './serviceCard.style';
import { FormattedDate, IntlProvider } from 'react-intl'
import SingleServiceMap from '../maps/setups/singleSetUpMap'


export default class SingleServiceView extends Component {


  // renderSetUpNote() {
  //   const { service } = this.props;
  //   const setUpNotes = service.setUpService.setUpNotes
  //   console.log("Notes", setUpNotes)
  //   return setUpNotes.map(({ id, setUpNoteContent }) => {
  //     return(
  //       <p key={id} className="ServiceInfoDetails">
  //         {setUpNoteContent}
  //       </p>
  //     )
  //   })
  // }
  
  render() {
    console.log("Single View", this.props)
    const { service, containerAttributes, setUpAttributes, truckAttributes } = this.props;
    const location = service.location
    const containment = service.oilCollectionService.containment
    const setUpDetails = service.setUpService
    const truck = service.setUpService.truck
    const driver = service.setUpService.truck.driver.user
    const name = location.locationName ? location.locationName : 'No Name';
    const streetAddress = location.streetNumber + ' ' + location.street;
    const restAddress = `${location.city}, ${location.state} ${location.zip}`
    const extraInfos = [];
    const setUpInfos = [];
    setUpAttributes.forEach(attribute => {
      const value = setUpDetails[attribute.value]
      if (value) {
        setUpInfos.push(
          <div className="ServiceCardInfos" key={attribute.value}>
            <p className="ServiceInfoLabel">{`${attribute.title}`}</p>
            <p className="ServiceInfoDetails">
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
          <div className="ServiceCardInfos" key={attribute.value}>
            <p className="ServiceInfoLabel">{`${attribute.title}`}</p>
            <p className="ServiceInfoDetails">
              {value}
            </p>
          </div>
        );
      }
    });
    truckAttributes.forEach(attribute => {
      const value = truck[attribute.value];
      if (value) {
        extraInfos.push(
          <div className="ServiceCardInfos" key={attribute.value}>
            <p className="ServiceInfoLabel">{`${attribute.title}`}</p>
            <p className="ServiceInfoDetails">
              {value}
            </p>
          </div>
        );
      }
    });
    return (
      <ServiceCardWrapper className="ServiceCard">
        <div className="ServiceCardHead">
          <div className="ServiceMap">
            <SingleServiceMap 
              markers={location}
            />
          </div>
          <h1 className="SetUpName">{name}</h1>
          <p className="ServiceAddress">{streetAddress}</p>
          <p className="ServiceAddress">{restAddress}</p>
        </div>
        <div className="ServiceInfoWrapper"> 
          {setUpInfos}
          {extraInfos}
          <div className="ServiceCardInfos">
            <p className="ServiceInfoLabel">Driver</p>
            <p className="ServiceInfoDetails">
             { `${driver.firstName} ${driver.lastName}`}
            </p>
          </div>
          <div className="ServiceCardInfos">
            <p className="ServiceInfoLabel">Notes</p>
              {/* {this.renderSetUpNote()} */}
          </div>
        </div>
      </ServiceCardWrapper>
      
    );
  }
}
