import React from 'react';
import LayoutContent from '../utility';


class UserList extends React.Component {

  renderUsers(){
    return this.props.users.map(user => {
      return(
        <li key={user.id}>{user.name}</li>
      )
    })
  }

  render() {
    console.log(this.props)
    return (
        <LayoutContent>
          <h1>Users List</h1>
          <ul>
            {this.renderUsers()}
          </ul>
        </LayoutContent>
    );
  }
}



export default UserList;
