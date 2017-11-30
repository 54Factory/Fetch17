import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';


import AssignDriverToTruckForm from './assignDriverForm';

class AssignDriver extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      error: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // Submit Function 
  handleSubmit(values) {
    this.props.setTruckOnDriver(values)
      .then((response) => {
        if (response.data.setTruckOnDriver.error === undefined) {
            window.location.pathname = `dashboard/trucks`
        } else {
          this.setState({
            error: response.data.setTruckOnDriver.error
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    if(this.props.data.loading) {
      return(
        <div>Loading...</div>
      )

    }
    const driver = this.props.data.driver
    const truck = this.props.data.truck
    return (
      <AssignDriverToTruckForm
        driver={driver}
        truck={truck}
        onSubmit={this.handleSubmit.bind(this)}
      />
    )
  }
}

const DriverAndTruckQuery = gql`
query AddDriverToTruckQuery {
  driver: allDrivers{
  id
  user {
    id
    firstName
    lastName
  }
}
  truck: allTrucks{
    id
    name
  }
}
` 
const SetTruckOnDriverMutation = gql`
mutation AssignDriverToTruck($driverDriverId: ID!, $truckTruckId: ID!) {
  setTruckOnDriver(driverDriverId: $driverDriverId, truckTruckId: $truckTruckId){
    driverDriver{
      id
      user {
        id
        firstName
        lastName
      }
    }
    truckTruck{
      id
      name
      nickname
      description
    }
  }
}
`

export default compose(
  graphql(DriverAndTruckQuery),  
  graphql(SetTruckOnDriverMutation, {
    props: ({ mutate }) => ({
      setTruckOnDriver: ({
        driverDriverId,
        truckTruckId
      }) => mutate({
        variables: {
          driverDriverId,
          truckTruckId
        }
      })
    })
  }))(AssignDriver)
