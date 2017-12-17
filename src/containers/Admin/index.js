import React from 'react';
import { FetchV2DirectionsMap } from '../../components/maps/distance'
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';


export default class AdminSetUpExpenseTracker extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      directions: null
    }
   this.setDistanceState = this.setDistanceState.bind(this)

  }
  
  setDistanceState(field, value) {
    // parent class change handler is always called with field name and value
    this.setState({[field]: value});
  }

  render() {
    console.log("Props------>", this.props)
    console.log("State------>",this.state)
    const { directions } = this.state
    console.log("Directions---->", directions) 
    return (
      <LayoutContentWrapper style={{ height: '100vh' }}>
        <LayoutContent>
          <h1>Expense Tracker</h1>
          {directions == null ? 
          <div>
            <p>Loading....</p>
          </div>
          :
          <div>
           <p>Distance: {parseFloat(directions.routes["0"].legs["0"].distance.text, 10)} miles</p>
           <p>Duration: {parseInt(directions.routes["0"].legs["0"].duration.text, 10)} mins</p>
          </div>
          }
          <FetchV2DirectionsMap 
            distance={this.setDistanceState.bind(this)}
          />
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}
