import React, { Component } from 'react';
import { CollectionCardWrapper } from '../collectionCard.style';
import { FormattedDate, IntlProvider } from 'react-intl'
import SingleCollectionMap from '../../maps/oilcollection/singleCollection'



export default class SingleCollectionView extends Component {

  renderSetUpNote() {
    const { collection } = this.props;
    const setUpNotes = collection.service.setUpService.setUpNotes
    console.log("Notes", setUpNotes)
    return setUpNotes.map(({ id, setUpNoteContent }) => {
      return(
        <p key={id} className="CollectionInfoDetails">
          {setUpNoteContent}
        </p>
      )
    })
  }
  
  render() {
    console.log("Single View", this.props)
    const { collection, containerAttributes, setUpAttributes, truckAttributes } = this.props;
    const location = collection.service.location
    const name = location.locationName ? location.locationName : 'No Name';
    const setUpDetails = collection.service.setUpService;
    const containment = collection.containment;
    const truck = collection.truck
    const driver = collection.truck.driver.user
    const streetAddress = location.streetNumber + ' ' + location.street;
    const restAddress = `${location.city}, ${location.state} ${location.zip}`
    const extraInfos = [];
    const setUpInfos = [];
    setUpAttributes.forEach(attribute => {
      const value = setUpDetails[attribute.value]
      if (value) {
        setUpInfos.push(
          <div className="CollectionCardInfos" key={attribute.value}>
            <p className="CollectionInfoLabel">{`${attribute.title}`}</p>
            <p className="CollectionInfoDetails">
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
          <div className="CollectionCardInfos" key={attribute.value}>
            <p className="CollectionInfoLabel">{`${attribute.title}`}</p>
            <p className="CollectionInfoDetails">
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
          <div className="CollectionCardInfos" key={attribute.value}>
            <p className="CollectionInfoLabel">{`${attribute.title}`}</p>
            <p className="CollectionInfoDetails">
              {value}
            </p>
          </div>
        );
      }
    });
    return (
      <CollectionCardWrapper className="CollectionCard">
        <div className="CollectionCardHead">
          <div className="CollectionMap">
            <SingleCollectionMap 
              markers={location}
            />
          </div>
          <h1 className="CollectionName">{name}</h1>
          <p className="CollectionAddress">{streetAddress}</p>
          <p className="CollectionAddress">{restAddress}</p>
        </div>
        <div className="CollectionInfoWrapper"> 
          {setUpInfos}
          {extraInfos}
          <div className="CollectionCardInfos">
            <p className="CollectionInfoLabel">Driver</p>
            <p className="CollectionInfoDetails">
              { `${driver.firstName} ${driver.lastName}`}
            </p>
          </div>
          <div className="CollectionCardInfos">
            <p className="CollectionInfoLabel">Notes</p>
              {this.renderSetUpNote()}
          </div>
        </div>
      </CollectionCardWrapper>
      
    );
  }
}
