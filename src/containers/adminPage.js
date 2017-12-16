
import React, { Component } from 'react';
import {FetchV2DirectionsMap} from '../components/maps/distance'
import LayoutContentWrapper from '../components/utility/layoutWrapper';
import LayoutContent from '../components/utility/layoutContent';


export default class extends Component {

  constructor(props) {
    super(props)
    this.state = {
      directions: null
    }
   this.setDistanceState = this.setDistanceState.bind(this)
   //this.renderDistanceDetails = this.renderDistanceDetails.bind(this)
   //this.setDetails = this.setDetails.bind(this)
  }
  
  setDistanceState(field, value) {
    // parent class change handler is always called with field name and value
    this.setState({[field]: value});
  }

  // setDetails(result) {
  //   const details = result
  //   console.log("From Set Details-->", details)
  //   return(
  //     <div>Distance: {details === undefined ? 'Loading' : `${details.status}` }</div>
  //   )
  // }




//  renderDistanceDetails() {
//     const distanceDetails = this.state.directions
//     console.log("RenderDetails", distanceDetails)
//     distanceDetails != null ? distanceDetails.routes.map(results => {
//       return results.legs.map(details => {
//         return(console.log(details))

        
//       })
      
//     })
//   : console.log('no deets') 
//   }


  render() {
    console.log("Props------>", this.props)
    console.log("State------>",this.state)
    const { directions } = this.state
    console.log("Directions---->", directions) 
    return (
      <LayoutContentWrapper style={{ height: '100vh' }}>
        <LayoutContent>
          <h1>Admin Page</h1>
          {directions == null ? 
          <div>
            <p>Loading....</p>
          </div>
          :
          <div>
           <p>Distance: {directions.routes["0"].legs["0"].distance.text}</p>
          </div>
          }
          <FetchV2DirectionsMap 
            handleNewState={this.setDistanceState.bind(this)}
            //getDetails={this.setDetails.bind(this)}
          />
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}
