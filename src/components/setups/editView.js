import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { SINGLE_SET_UP_QUERY } from '../../graphql/queries'
import { UPDATE_OIL_ACCOUNT_STATE } from '../../graphql/mutations'
import SingleSetUpMap from '../maps/setups/singleSetUpMap'
import SetUpNoteForm from '../../containers/Create/Forms/setUpNoteForm'
import Button from '../../components/uielements/button';
import { FormattedDate, IntlProvider } from 'react-intl'
import { SetUpCardWrapper } from './setUpCard.style';
import './upload.css';



//export default class editSetUpView extends Component {
class editSetUpView extends Component {


  

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
    const { setup } = this.props;
    const date = new Date()
    const today = date.toISOString()  
    await this.props.updateOilAccountState({variables: { 
      id: this.props.data.OilCollectionState.id,
      active: false, 
      setup: true,
      oilServiceId: this.props.data.OilCollectionState.oilCollectionService.id,
      actualSetUpDate: today,
      setUpServiceId: setup.oilCollectionService.service.setUpService.id,
      scheduledCollectionDate: this.props.data.OilCollectionState.oilCollectionService.startDate
    }});
    //this.props.history.push('/dashboard/pendingSetUps')
      window.location.reload()
  }

  renderSetUpNote() {
    const { setup } = this.props;
    const setUpNotes = setup.oilCollectionService.service.setUpService.setUpNotes
    console.log("Notes", setUpNotes)
    return setUpNotes.map(({ id, setUpNoteContent }) => {
      return(
        <p key={id} className="SetUpNoteDetails">
          {setUpNoteContent}
        </p>
      )
    })
  }

  render() {
    console.log(this.props)
    const { setup, containerAttributes, setUpAttributes, truckAttributes } = this.props;
    const location = setup.oilCollectionService.service.location
    const containment = setup.oilCollectionService.containment
    const setUpDetails = setup.oilCollectionService.service.setUpService
    const truck = setup.oilCollectionService.service.setUpService.truck
    const driver = setup.oilCollectionService.service.setUpService.truck.driver.user
    const name = location.locationName ? location.locationName : 'No Name';
    const streetAddress = location.streetNumber + ' ' + location.street;
    const restAddress = `${location.city}, ${location.state} ${location.zip}`
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
    truckAttributes.forEach(attribute => {
      const value = truck[attribute.value];
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
          <p className="SetUpAddress">{streetAddress}</p>
          <p className="SetUpAddress">{restAddress}</p>
        </div>
        <div className="SetUpInfoWrapper"> 
          {setUpInfos}
          {extraInfos}
          <div className="SetUpCardInfos">
            <p className="SetUpInfoLabel">Driver</p>
            <p className="SetUpInfoDetails">
             { `${driver.firstName} ${driver.lastName}`}
            </p>
          </div>
          <div className="SetUpCardInfos">
            <p className="SetUpInfoLabel">Set Up Note</p>
              {this.renderSetUpNote()}
          </div>
          <div className="SetUpCardInfos">
            <p className="SetUpInfoLabel">Add Note</p>
          <SetUpNoteForm />
          </div>
          <Button onClick={this.onSubmit} className="SetUpBtn" type="primary">Complete Set Up</Button>
        </div>
        
      </SetUpCardWrapper>
    );
  }
}

// const SetUpQuery = gql`
// query SetUp($id: ID!){
//   OilCollectionState(id: $id) {
//       id
//       active
//       setup
//       oilCollectionService{
//         id
//         serviceCycle
//         serviceType
//         startDate
//         containment{
//           id
//           containerType
//           quantity
//         }
//         service{
//           id
//           setUpService{
//             id
//             setUpDate
//             setUpNotes{
//               id
//               setUpNoteContent
//             }
//           }
//           location{
//             id
//             locationName
//             streetNumber
//             street
//             city
//             state
//             zip
//             lat
//             lng
//           }
//         }
//       }
//     }
//   }
// `;

const SetUpPageWithData = graphql(SINGLE_SET_UP_QUERY, {
  options: ({ setup }) => ({
    variables: {
      id: setup.id,
    },
  }),
  })(editSetUpView)

  
  const SetUpPageWithUpdate = graphql(UPDATE_OIL_ACCOUNT_STATE, {name: 'updateOilAccountState'})(SetUpPageWithData);
  
  export default withRouter(SetUpPageWithUpdate)