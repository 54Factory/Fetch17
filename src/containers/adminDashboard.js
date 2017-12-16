import React, { Component } from 'react';

import LayoutContentWrapper from '../components/utility/layoutWrapper';
import LayoutContent from '../components/utility/layoutContent';

export default class extends Component {
  
//   componentDidMount () {

//     const headers = {
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': '*' 
//     }
//     const targetUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=Vancouver+BC|Seattle&destinations=San+Francisco|Victoria+BC&mode=driving&language=en-EN';
//     axios.get( targetUrl, headers )
//         .then( response => response.json())
//         .then(data => {
//           console.log(data);
//           document.querySelector("pre").innerHTML = JSON.stringify(data, null, 2);
//           return data;
//         })
//         .catch( error => {
//             this.setState( { error: true } );
//         } );
// }
  
  render() {
    return (
      <LayoutContentWrapper style={{ height: '100vh' }}>
        <LayoutContent>
          <h1>FETCH ADMIN DASHBOARD HOME</h1>
          <div style={{height: `100%`}}>
            
          </div>
          
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}


