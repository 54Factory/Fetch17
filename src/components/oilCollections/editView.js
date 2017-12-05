import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Button from '../../components/uielements/button';
import Input from '../uielements/input';
import { graphql } from 'react-apollo'
import { SINGLE_SET_UP_QUERY } from '../../graphql/queries'
import { UPDATE_OIL_ACCOUNT_STATE } from '../../graphql/mutations'
//import SingleCollectionMap from '../maps/oilCollections/singleCollectionMap'
import { FormattedDate, IntlProvider } from 'react-intl'
import { CollectionCardWrapper } from './collectionCard.style';
import './upload.css';

//export default class editCollectionView extends Component {
class editCollectionView extends Component {

  componentWillMount() {
    console.log('Edit view Mount Lifecycle')
  }

  backButton() {
    console.log('button was clicked');
    this.props.history.push('/dashboard/setups')
  }

  buttonTest () {
    console.log('clicked...')
  }

  onSubmit = async () => {
    // const {active, setup } = this.state;
    await this.props.updateOilAccountState({variables: { 
      id: this.props.data.OilCollectionState.id,
      active: false, 
      setup: true,
      oilServiceId: this.props.data.OilCollectionState.oilCollectionService.id,
      scheduledCollectionDate: this.props.data.OilCollectionState.oilCollectionService.startDate
    }});
    //this.props.history.push('/dashboard/pendingSetUps')
      window.location.reload()
  }

  renderSetUpNote() {
    const { collection } = this.props;
    const setUpNotes = collection.oilCollectionService.service.setUpService.setUpNotes
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
    console.log(this.props)
    const { collection, containerAttributes, setUpAttributes } = this.props;
    const location = collection.oilCollectionService.service.location
    const containment = collection.oilCollectionService.containment
    const setUpDetails = collection.oilCollectionService.service.setUpService
    const streetAddress = location.streetNumber + ' ' + location.street;
    const restAddress = `${location.city}, ${location.state} ${location.zip}`    
    const name = location.locationName ? location.locationName : 'No Name';
    const extraInfos = [];
    const setUpInfos = [];
    const names = [
      { title: 'Quantity', value: 'quantity', type: 'number' },
      { title: 'Container', value: 'containerType', type: 'name' }
    ];
    [...names, ...containerAttributes].forEach(attribute => {
      const value = containment[attribute.value];
      const editCollection = event => {
        collection[attribute.value] = event.target.value;
        let name = '';
        if (collection.name) {
          name = `${collection.name} `;
        }
        collection.name = name;
        this.props.editCollection(collection);
      };
      if (attribute.value === 'note') {
        extraInfos.push(
          <div className="CollectionCardInfos" key={attribute.value}>
            <p className="CollectionInfoLabel">{`${attribute.title}`}</p>
            <Input
              placeholder={`${attribute.title}`}
              value={value}
              type="textarea"
              rows={5}
              onChange={event => editCollection(event)}
            />
          </div>
        );
      } else {
        extraInfos.push(
          <div className="CollectionCardInfos" key={attribute.value}>
            <p className="CollectionInfoLabel">{`${attribute.title}`}</p>
            <Input
              placeholder={`${attribute.title}`}
              value={value}
              onChange={event => editCollection(event)}
            />
          </div>
        );
      }
    });
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
    return (
      <CollectionCardWrapper className="CollectionCard">
        <div className="CollectionCardHead">
        <div className="CollectionMap">
          {/* <SingleCollectionMap 
            markers={location}
          /> */}
        </div>
        <h1 className="CollectionName">{name}</h1>
        <p className="CollectionAddress">{streetAddress}</p>
        <p className="CollectionAddress">{restAddress}</p>
      </div>
        <div className="CollectionInfoWrapper">
          {setUpInfos}
          <div className="CollectionCardInfos">
            <p className="CollectionInfoLabel">Notes</p>
              {this.renderSetUpNote()}
          </div>
          {extraInfos}
          <div>
          {/* <Button onClick={this.onSubmit} className="SetUpBtn" type="primary">Complete Set Up</Button> */}
          </div>
        </div>
      </CollectionCardWrapper>
    );
  }
}

const SetUpPageWithData = graphql(SINGLE_SET_UP_QUERY, {
  options: ({ setup }) => ({
    variables: {
      id: setup.id,
    },
  }),
  })(editCollectionView)

  
  const SetUpPageWithUpdate = graphql(UPDATE_OIL_ACCOUNT_STATE, {name: 'updateOilAccountState'})(SetUpPageWithData);
  
  export default withRouter(SetUpPageWithUpdate)