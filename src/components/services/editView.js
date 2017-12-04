import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Button from '../../components/uielements/button';
import Input from '../uielements/input';
import { graphql } from 'react-apollo'
import { SINGLE_SET_UP_QUERY } from '../../graphql/queries'
import { UPDATE_OIL_ACCOUNT_STATE } from '../../graphql/mutations'
import SingleServiceMap from '../maps/setups/singleSetUpMap'
import { FormattedDate, IntlProvider } from 'react-intl'
import { ServiceCardWrapper } from './serviceCard.style';
import './upload.css';

//export default class editSetUpView extends Component {
class editServiceView extends Component {

  componentWillMount() {
    console.log('Edit view Mount Lifecycle')
  }

  // backButton() {
  //   console.log('button was clicked');
  //   this.props.history.push('/dashboard/setups')
  // }

  // buttonTest () {
  //   console.log('clicked...')
  // }

  // onSubmit = async () => {
  //   // const {active, setup } = this.state;
  //   await this.props.updateOilAccountState({variables: { 
  //     id: this.props.data.OilCollectionState.id,
  //     active: false, 
  //     setup: true,
  //     oilServiceId: this.props.data.OilCollectionState.oilCollectionService.id,
  //     scheduledCollectionDate: this.props.data.OilCollectionState.oilCollectionService.startDate
  //   }});
  //   //this.props.history.push('/dashboard/pendingSetUps')
  //     window.location.reload()
  // }

  // renderSetUpNote() {
  //   const { service } = this.props;
  //   const setUpNotes = service.oilCollectionService.service.setUpService.setUpNotes
  //   console.log("Notes", setUpNotes)
  //   return setUpNotes.map(({ id, setUpNoteContent }) => {
  //     return(
  //       <p key={id} className="SetUpInfoDetails">
  //         {setUpNoteContent}
  //       </p>
  //     )
  //   })
  // }

  render() {
    console.log(this.props)
    const { service, containerAttributes, setUpAttributes } = this.props;
    const location = service.oilCollectionService.service.location
    const containment = service.oilCollectionService.containment
    const setUpDetails = service.oilCollectionService.service.setUpService
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
      const editService = event => {
        service[attribute.value] = event.target.value;
        let name = '';
        if (service.name) {
          name = `${service.name} `;
        }
        service.name = name;
        this.props.editService(service);
      };
      if (attribute.value === 'note') {
        extraInfos.push(
          <div className="ServiceCardInfos" key={attribute.value}>
            <p className="ServiceInfoLabel">{`${attribute.title}`}</p>
            <Input
              placeholder={`${attribute.title}`}
              value={value}
              type="textarea"
              rows={5}
              onChange={event => editService(event)}
            />
          </div>
        );
      } else {
        extraInfos.push(
          <div className="ServiceCardInfos" key={attribute.value}>
            <p className="ServiceInfoLabel">{`${attribute.title}`}</p>
            <Input
              placeholder={`${attribute.title}`}
              value={value}
              onChange={event => editService(event)}
            />
          </div>
        );
      }
    });
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
    return (
      <ServiceCardWrapper className="ServiceCard">
        <div className="ServiceCardHead">
        <div className="ServiceMap">
          <SingleServiceMap 
            markers={location}
          />
        </div>
        <h1 className="ServiceName">{name}</h1>
        <p className="ServiceAddress">{streetAddress}</p>
        <p className="ServiceAddress">{restAddress}</p>
      </div>
        <div className="ServiceInfoWrapper">
          {setUpInfos}
          {/* <div className="SetUpCardInfos">
            <p className="SetUpInfoLabel">Notes</p>
              {this.renderSetUpNote()}
          </div> */}
          {extraInfos}
          <div>
          <Button onClick={this.onSubmit} className="ServiceBtn" type="primary">Complete Set Up</Button>
          </div>
        </div>
      </ServiceCardWrapper>
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
  })(editServiceView)

  
  const SetUpPageWithUpdate = graphql(UPDATE_OIL_ACCOUNT_STATE, {name: 'updateOilAccountState'})(SetUpPageWithData);
  
  export default withRouter(SetUpPageWithUpdate)