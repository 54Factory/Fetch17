import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'
import { Layout, Button, Alert, Spin } from 'antd';
import SingleMarkerMap from '../../../components/maps/singleMarker'
import LocationForm from '../Forms/locationForm'
import CustomerForm from '../Forms/customerForm'
import SetUpForm from '../Forms/setUpForm'
import OilServiceForm from '../Forms/oilServiceForm'
import PageHeader from '../../../components/utility/pageHeader';

import { FormsWrapper } from './forms.style';
// import { Button } from 'antd/lib/radio';


const { Content } = Layout;


class NewOilCollectionCustomer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //customer
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      role: '',
      customerNoteContent: '',
      //setups
      setUpDate: '',
      quantity: '',
      containerType: '',
      setUpNoteContent: '',
      //oilSevice
      serviceType: '',
      serviceCycle: '',
      streetNumber: '',
      street: '',
      township: 'N/A',
      neighborhood: 'N/A',
      county: '',
      state: '',
      city: '',
      zip: '',
      lat: '',
      lng: '',
      address: '',
      geocodeResults: null,
      addressValueResults: null,
      loading: false
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.handleAddress = this.handleAddress.bind(this)
    this.handleChange = this.handleChange.bind(this)
    // this.handleInputChange = this.handleInputChange.bind(this)
    // this.handleCustomerFirstName = this.handleCustomerFirstName.bind(this)
    // this.handleCustomerLastName = this.handleCustomerLastName.bind(this)
    
    this.renderGeocodeFailure = this.renderGeocodeFailure.bind(this)
    this.renderGeocodeSuccess = this.renderGeocodeSuccess.bind(this)
    
  }
  setLocationNameState(field, value) {
    // parent class change handler is always called with field name and value
    this.setState({[field]: value});
  }
  setCustomerState(field, value) {
    // parent class change handler is always called with field name and value
    this.setState({[field]: value});
  }
  setDateState(field, value) {
    // parent class change handler is always called with field name and value
    this.setState({[field]: value.toISOString()});
  }
  setSetUpSelectorState(field, value) {
    this.setState({[field]: value});
  }
  setOilCollectionState(field, value) {
    this.setState({[field]: value});
  }

  onSubmit = async () => {
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      role, 
      customerNoteContent, 
      locationName, 
      streetNumber,
      street, 
      township, 
      neighborhood, 
      city, 
      county, 
      state, 
      zip, 
      lat, 
      lng, 
      locationNoteContent, 
      setUpDate, 
      quantity, 
      containerType,
      setUpNoteContent, 
      startDate, 
      serviceCycle,
      serviceType,
      oilCollectionNoteContent, 
    } = this.state;
    await this.props.NewCustomerOilService({ variables: {
      locationName,
      streetNumber, 
      street, 
      township, 
      neighborhood, 
      city, 
      county, 
      state, 
      zip, 
      lat, 
      lng,
      locationNotes: [{
        locationNoteContent
      }],
      customer: {
      firstName,
      lastName,
      email,
      phone,
      role,
        customerNotes: [{
          customerNoteContent
        }]
      },
      service: {
        oilCollectionService: {
          startDate,
          serviceType,
          serviceCycle: parseInt(serviceCycle, 10),
          containment: {
            quantity: parseInt(quantity, 10),
            containerType
          },
          oilCollectionState: {
            active: false,
            setup: false
          },
          oilCollectionNotes: [{
          oilCollectionNoteContent
        }]
        },
        setUpService: {
          setUpDate,
          truckId: "cjas5z0gvfren013087ob1z65",
          setUpNotes: [{
            setUpNoteContent
          }]
        }
      }
      }});
      //this.props.history.push('/dashboard/pendingSetups')
    window.location.pathname = `/dashboard/pendingSetups`
  }

  getLatLng(result) {
    return new Promise((resolve, reject) =>{
      try {
        const latLng = {
          lat: result.geometry.location.lat(),
          lng: result.geometry.location.lng(),
        }
        resolve(latLng)
      } catch (e) {
        reject(e)
      }
    })
  }

  handleAddress(address) {
    this.setState({
      address,
      loading: true,
    })

    geocodeByAddress(address)
      .then(function(results, status) {
        let addressResults = []
        for (var key in results) {
          var add = results[key];
          //console.log(add);
          for (var key2 in add.address_components) {
            var add2 = add.address_components[key2];
            //console.log(add2);
            for (var key3 in add2.types) {
              //console.log(add2.types[key3])
              if ((add2.types[key3].localeCompare('street_number')) === 0) {
                let street_number = {street_number: add2['long_name']}
                addressResults.push(street_number)
                //console.log(add2['long_name']);
              }
              if ((add2.types[key3].localeCompare('route')) === 0) {
                let street = {street: add2['long_name']}
                addressResults.push(street)
                //console.log(add2['long_name']);
              }
              if ((add2.types[key3].localeCompare('locality')) === 0) {
                let city = {city: add2['long_name']}
                addressResults.push(city)
                //console.log(add2['long_name']);
              }
              if ((add2.types[key3].localeCompare('neighborhood')) === 0) {
                let neighborhood = {neighborhood: add2['long_name']}
                addressResults.push(neighborhood)
                //console.log(add2['long_name']);
              }
              if ((add2.types[key3].localeCompare('administrative_area_level_3')) === 0) {
                let township = {township: add2['long_name']}
                addressResults.push(township)
                //console.log(add2['long_name']);
              }
              if ((add2.types[key3].localeCompare('administrative_area_level_2')) === 0) {
                let county = {county: add2['long_name']}
                addressResults.push(county)
                //console.log(add2['long_name']);
              }
              if ((add2.types[key3].localeCompare('administrative_area_level_1')) === 0) {
                let state = {state: add2['long_name']}
                addressResults.push(state)
                //console.log(add2['long_name']);
              }
              if ((add2.types[key3].localeCompare('postal_code')) === 0) {
                let zip = {zip: add2['long_name']}
                addressResults.push(zip)
                //console.log(add2['long_name']);
              }
            }
          }

          var addressValues = addressResults.reduce(function(result, currentObject) {
            for(var key in currentObject) {
                if (currentObject.hasOwnProperty(key)) {
                    result[key] = currentObject[key];
                }
            }

            
            return result;
        }, {})
        return addressValues

      }    
      })
      .then((addressValues) => {
        if (typeof addressValues === "undefined") {
          alert("something is undefined");
      }
        this.setState({
          streetNumber: addressValues.street_number,
          street: addressValues.street,
          city: addressValues.city,
          county: addressValues.county,
          state: addressValues.state,
          zip: addressValues.zip, 
          neighborhood: addressValues.neighborhood,
          township: addressValues.township,
          addressValueResults: this.renderAddressSuccess(addressValues),
          loading: false
        })
      })
      .catch((error) => {
        console.log('Oh no!', error)
        this.setState({
          geocodeResults: this.renderGeocodeFailure(error),
          loading: false
        })
      })
      geocodeByAddress(address)
      .then((results) => this.getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('Success Yay', { lat, lng })
        this.setState({
          lat: lat,
          lng: lng,
          geocodeResults: this.renderGeocodeSuccess(lat, lng),
          loading: false
        })
      })
      .catch((error) => {
        console.log('Oh no!', error)
        this.setState({
          geocodeResults: this.renderGeocodeFailure(error),
          loading: false
        })
      })
    }


  handleSelect(address) {
    this.setState({
      address,
      loading: true
    })

    geocodeByAddress(address)
      .then((results) => this.getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('Success Yay', { lat, lng })
        this.setState({
          lat: lat,
          lng: lng,
          geocodeResults: this.renderGeocodeSuccess(lat, lng),
          loading: false
        })
      })
      .catch((error) => {
        console.log('Oh no!', error)
        this.setState({
          geocodeResults: this.renderGeocodeFailure(error),
          loading: false
        })
      })
  }

  handleChange(address) {
    this.setState({
      address,
      geocodeResults: null
    })
  }

  renderGeocodeFailure(err) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Error!</strong> {err}
      </div>
    )
  }

  renderGeocodeSuccess(lat, lng) {
    const locations = {
      lat,
      lng
    }

    return (
      <div>
        <Alert
          message="Success!"
          description="Fetch Location Finder found what it needed. Please continue to fill in form." 
          type="success" 
          showIcon 
        />
        <SingleMarkerMap 
          markers={locations}
        />
      </div>
    )
  }

  renderAddressSuccess(addressValues) {
    return (
      <div>
        <div className="Header">
          <PageHeader>Location Details</PageHeader>
        </div>
          <LocationForm 
            onChange={this.setLocationNameState.bind(this)}
            addressValues={addressValues}
          />
        <div className="Header">
          <PageHeader>Customer Details</PageHeader>
        </div>
          <CustomerForm
            onChange={this.setCustomerState.bind(this)}
          />
        <div className="Header">
          <PageHeader>Set Up Details</PageHeader>
        </div>
          <SetUpForm 
            onDateChange={this.setDateState.bind(this)}
            onQuantitySelectorChange={this.setSetUpSelectorState.bind(this)}
            onContainerTypeSelectorChange={this.setSetUpSelectorState.bind(this)}
            onChange={this.setSetUpSelectorState.bind(this)}
          />
        <div className="Header">
          <PageHeader>Oil Service Details</PageHeader>
        </div>
          <OilServiceForm 
            onDateChange={this.setDateState.bind(this)}
            onServiceTypeSelectorChange={this.setSetUpSelectorState.bind(this)}
            onCycleSelectorChange={this.setSetUpSelectorState.bind(this)}
            onChange={this.setOilCollectionState.bind(this)}
          />
      <Button className="CreateBtn" onClick={this.onSubmit}>Create</Button>
    </div>
    )
  }

  render() {
    console.log(this.state)
    const cssClasses = {
      root: 'form-group',
      input: 'SearchInput',
      autocompleteContainer: 'AutoCompleteContainer',
    }

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className="SuggestionItem">
        <i className='fa fa-map-marker SuggestionIcon'/>
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small className="text-muted">{formattedSuggestion.secondaryText}</small>
      </div>)

    const inputProps = {
      type: "text",
      value: this.state.address,
      onChange: this.handleChange,
      onBlur: () => { console.log('Blur event!'); },
      onFocus: () => { console.log('Focused!'); },
      autoFocus: true,
      placeholder: "Search Places",
      name: 'Demo__input',
      id: "my-input-id",
    }

    return (
      <FormsWrapper 
        className="Forms"
        style={{ backround: 'none' }}
      >
      <Layout className="FormBoxWrapper">
        <PlacesAutocomplete
          onSelect={this.handleAddress}
          autocompleteItem={AutocompleteItem}
          onEnterKeyDown={this.handleAddress}
          classNames={cssClasses}
          inputProps={inputProps}
        />     
        {this.state.loading 
            ? 
            <Spin /> 
            : 
          null}
          {!this.state.loading && this.state.addressValueResults &&
            !this.state.loading && this.state.geocodeResults 
            ?
            <Content>
              {this.state.geocodeResults}
              {this.state.addressValueResults}
            </Content> 
            :
          null}
        </Layout>
      </FormsWrapper>
    )
  }
}

const NewCustomerOilServiceMutation = gql`
  mutation NewCustomerOilService(
    $zip: String!, 
    $state: String!,
    $neighborhood: String,
    $township: String,
    $county: String,
    $streetNumber: String, 
    $city: String!, 
    $lat: Float,
    $lng: Float,
    $street: String!, 
    $locationName: String!,
    $locationNotes: [LocationlocationNotesLocationNote!],
    $customer: LocationcustomerCustomer,
    $service: LocationserviceService
    ){
    createLocation(
      zip: $zip, 
      state: $state, 
      city: $city,
      county: $county,
      township: $township,
      neighborhood: $neighborhood,
      lat: $lat,
      lng: $lng,
      streetNumber: $streetNumber, 
      street: $street, 
      locationName: $locationName,
      locationNotes: $locationNotes
      customer: $customer,
      service: $service   
    ){
      id
      locationName
      lat
      lng
      customer{
        id
        firstName
        lastName
        role
        customerNotes{
          id
          customerNoteContent
        }
      }
      service{
        id
        oilCollectionService{
          id
          startDate
          serviceType
          serviceCycle
          containment{
            id
            containerType
            quantity
          }
        }
        setUpService{
          id
          setUpDate
          setUpNotes{
            id
            setUpNoteContent
          }
        }
      }
    }
  }
`




const createCustomerLocationOilServiceMutation = graphql(NewCustomerOilServiceMutation, {name: 'NewCustomerOilService'})(NewOilCollectionCustomer);

export default withRouter(createCustomerLocationOilServiceMutation)