import React from 'react';
import { connect } from 'react-redux'
import AdminApp from '../App/Admin/AdminApp'
import DriverApp from '../App//Driver/DriverApp'
import SignIn from '../Page/signin'
class GateKeeper extends React.Component {
  render() {
    console.log(this.props)
    const url= this.props.match
    const role = this.props.user.role
  if(role !== '') {
    switch (role) {
      case 'ADMIN':
        console.log('ADMIN Route')
        return <AdminApp url={url}/>
      case 'DRIVER':
        console.log('DRIVER Route')
        return <DriverApp url={url}/>
      default:
        console.log('No Roles Defined')
        return <SignIn />
    }
  }

}
}

const mapStateToProps = state => ({
  user: state.user,
 
});


export default connect(mapStateToProps)(GateKeeper);