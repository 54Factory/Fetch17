import React, { Component } from 'react';
import Input from '../uielements/input';
import SingleSetUpMap from '../maps/setups/singleSetUpMap'
import { FormattedDate, IntlProvider } from 'react-intl'
import { SetUpCardWrapper } from './setUpCard.style';
import './upload.css';

export default class editSetUpView extends Component {

  componentWillMount() {
    console.log('Edit view Mount Lifecycle')
  }

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
    const { setup, containerAttributes, setUpAttributes } = this.props;
    const location = setup.oilCollectionService.service.location
    const containment = setup.oilCollectionService.containment
    const setUpDetails = setup.oilCollectionService.service.setUpService
    const name = location.locationName ? location.locationName : 'No Name';
    const extraInfos = [];
    const setUpInfos = [];
    const names = [
      { title: 'Quantity', value: 'quantity', type: 'number' },
      { title: 'Container', value: 'containerType', type: 'name' }
    ];
    [...names, ...containerAttributes].forEach(attribute => {
      const value = containment[attribute.value];
      const editSetUp = event => {
        setup[attribute.value] = event.target.value;
        let name = '';
        if (setup.name) {
          name = `${setup.name} `;
        }
        setup.name = name;
        this.props.editSetUp(setup);
      };
      if (attribute.value === 'note') {
        extraInfos.push(
          <div className="SetUpCardInfos" key={attribute.value}>
            <p className="SetUpInfoLabel">{`${attribute.title}`}</p>
            <Input
              placeholder={`${attribute.title}`}
              value={value}
              type="textarea"
              rows={5}
              onChange={event => editSetUp(event)}
            />
          </div>
        );
      } else {
        extraInfos.push(
          <div className="SetUpCardInfos" key={attribute.value}>
            <p className="SetUpInfoLabel">{`${attribute.title}`}</p>
            <Input
              placeholder={`${attribute.title}`}
              value={value}
              onChange={event => editSetUp(event)}
            />
          </div>
        );
      }
    });
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
    return (
      <SetUpCardWrapper className="SetUpCard">
        <div className="SetUpCardHead">
        <div className="SetUpMap">
        <SingleSetUpMap 
          markers={location}
        />
      </div>
          <h1 className="SetUpName">
            {name}
          </h1>
        </div>
        <div className="SetUpInfoWrapper">
          {setUpInfos}
          <div className="SetUpCardInfos">
            <p className="SetUpInfoLabel">Notes</p>
              {this.renderSetUpNote()}
          </div>
          {extraInfos}
        </div>
      </SetUpCardWrapper>
    );
  }
}
