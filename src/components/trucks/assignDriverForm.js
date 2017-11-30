import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import Box from '../../components/utility/box';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import ContentHolder from '../../components/utility/contentHolder';
import IntlMessages from '../../components/utility/intlMessages';


class AssignDriverToTruckForm extends React.Component {

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      driver,
      truck
    } = this.props

    console.log(this.props)

    const renderDriverSelector = ({ input, meta: { touched, error } }) =>
    <div>
      <select {...input}>
        <option value="">Select Driver's Name</option>
        {this.props.driver.map(({id, user}) =>
          <option value={id} key={id}>
            {user.firstName} {user.lastName}
          </option>
        )}
      </select>
      {touched &&
        error &&
        <span>
          {error}
        </span>}
    </div>

    const renderTruckSelector = ({ input, meta: { touched, error } }) =>
    <div>
      <select {...input}>
        <option value="">Select Truck</option>
        {this.props.truck.map(({id, name}) =>
          <option value={id} key={id}>
            {name}
          </option>
        )}
      </select>
      {touched &&
        error &&
        <span>
          {error}
        </span>}
    </div>
    
    return (
      <LayoutWrapper>
        <Box
          title={<IntlMessages id="forms.truck.assignDriver.header" />}
          subtitle={`Make selections below`}
        >
          <ContentHolder>
          <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Driver Name</label>
              <div key={driver.id}>
                <Field name="driverDriverId" component={renderDriverSelector}/>
              </div>
              </div>
              <div>
                <label>Truck Name</label>
                <div key={truck.id}>
                  <Field name="truckTruckId" component={renderTruckSelector}/>
                </div>
              </div>
              <div>
                <button type="submit" disabled={pristine || submitting}>
                  Assign
                </button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                  Clear Values
                </button>
              </div>
             
          </form>
          </div>
          </ContentHolder>
        </Box>
      </LayoutWrapper>
     
    )
  }

}

// The order of the decoration does not matter.

// Decorate with redux-form


// Decorate with connect to read form values
const selector = formValueSelector('assignDriver') // <-- same as form name
AssignDriverToTruckForm = connect(state => {
  // can select values individually
  const truckTruckId = selector(state, 'truckTruckId')
  const driverDriverId = selector(state, 'driverDriverId')
  return {
    truckTruckId,
    driverDriverId,
  }
})(AssignDriverToTruckForm)



export default reduxForm({
  form: 'assignDriver' // a unique identifier for this form
})(AssignDriverToTruckForm)