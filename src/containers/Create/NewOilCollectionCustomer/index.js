import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'
import { Layout } from 'antd';
import { Alert } from 'antd';
import SingleMarkerMap from '../../../components/maps/singleMarker'
import LocationForm from '../Forms/locationForm'
import CustomerForm from '../Forms/customerForm'
import SetUpForm from '../Forms/setUpForm'
import OilServiceForm from '../Forms/oilServiceForm'
import { FormsWrapper } from './forms.style';
import './index.css';

const { Content } = Layout;

class NewOilCollectionCustomer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      role: '',
      customerNotes: '',
      setUpDate: '',
      quantity: '',
      containerType: '',
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
          setUpNotes: {
            setUpNoteContent
          }
        }
      }
      }});
      this.props.history.push('/dashboard/pendingSetups')
    //window.location.pathname = `/dashboard/pendingSetups`
  }
  // handleCustomerFormChange(e) {
  //   this.setState({
  //     firstName: e.target.value,
  //     lastName: e.target.value
  //   })
  // }

  // handleInputChange(event) {
  //   const target = event.target;
  //   const value = target.value;
  //   const name = target.name;

  //   this.setState({
  //     [name]: value
  //   });
  // }


  // handleCustomerFirstName(firstName, lastName) {
  //   this.setState({
  //     firstName,
  //     lastName
  //   })
  // }
  // handleCustomerLastName(lastName) {
  //   this.setState({
  //     lastName
  //   })
  // }


  getLatLng(result) {
    console.log(result)
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
            console.log("Address Values", result)
            
            return result;
        }, {})
        console.log('Return Values: ', results);
        console.log('Address Results', addressResults);
        console.log('Address Values: ', addressValues); 
        return addressValues

      }    
      })
      .then((addressValues) => {
        console.log(addressValues)
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
    console.log(locations)
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
        <h4>Location Details</h4>
          <LocationForm 
            onChange={this.setLocationNameState.bind(this)}
            addressValues={addressValues}
          />
        <h4>Customer Details</h4>
          <CustomerForm
            onChange={this.setCustomerState.bind(this)}
          />
          <h4>Set Up Details</h4>
          <SetUpForm 
            onDateChange={this.setDateState.bind(this)}
            onQuantitySelectorChange={this.setSetUpSelectorState.bind(this)}
            onContainerTypeSelectorChange={this.setSetUpSelectorState.bind(this)}
          />
          <h4>Oil Service Details</h4>
          <OilServiceForm 
            onDateChange={this.setDateState.bind(this)}
            onServiceTypeSelectorChange={this.setSetUpSelectorState.bind(this)}
            onCycleSelectorChange={this.setSetUpSelectorState.bind(this)}
          />
      <button onClick={this.onSubmit} color="success">Create</button>
    </div>
    )
  }

  render() {
    console.log(this.state)
    const cssClasses = {
      root: 'form-group',
      input: 'Demo__search-input',
      autocompleteContainer: 'Demo__autocomplete-container',
    }

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className="Demo__suggestion-item">
        <i className='fa fa-map-marker Demo__suggestion-icon'/>
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
            <div>
              <i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" />
            </div> 
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



      // <div className='page-wrapper'>
      //   <div className='container'>
      //     <h1 className='display-3'>Fetch  Location Finder <i className='fa fa-map-marker header'/></h1>
      //     <p className='lead'>Search A Place or Address</p>
      //   </div>
      //   <div className='container'>
      //     <PlacesAutocomplete
      //       onSelect={this.handleAddress}
      //       autocompleteItem={AutocompleteItem}
      //       onEnterKeyDown={this.handleAddress}
      //       classNames={cssClasses}
      //       inputProps={inputProps}
      //     />
      //     {this.state.loading ? <div><i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" /></div> : null}
      //     {!this.state.loading && this.state.geocodeResults ?
      //       <div className='geocoding-results'>{this.state.geocodeResults}</div> :
      //     null}
      //     {this.state.loading ? <div><i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" /></div> : null}
      //     {!this.state.loading && this.state.addressValueResults ?
      //       <div className='geocoding-results'>{this.state.addressValueResults}</div> :
      //     null}
      //   </div>
      // </div>
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
      startDate
      serviceType
      serviceCycle
      containment{
        containerType
        quantity
      }
    }
    setUpService{
      id
      setUpDate
      setUpNotes{
        setUpNoteContent
      }
    }
  }
}
}
`




const createCustomerLocationOilServiceMutation = graphql(NewCustomerOilServiceMutation, {name: 'NewCustomerOilService'})(NewOilCollectionCustomer);

export default withRouter(createCustomerLocationOilServiceMutation)