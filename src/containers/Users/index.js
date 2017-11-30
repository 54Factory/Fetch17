// import React from "react";
// import { connect } from "react-redux";
// import { fetchUsers } from '../../redux/users/actions'
// import UsersList from '../../components/users/usersList'
// class Users extends React.Component {

//   componentWillMount() {
//     this.props.fetchUsers()
//   }

//   render() {
//     const Users = this.props.Users.allUsers
//     console.log(this.props)
//     return (
//       <div>
//         <UsersList 
//         users={Users}
//         />
//       </div>
//     );
//   }
// }


// const mapStateToProps = (state) => {
//   return { Users: state.Users }
// }

// export default connect(mapStateToProps, { fetchUsers })(Users);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as UserAction from '../../redux/users/actions';
import { Layout, Icon } from 'antd';
import Button from '../../components/uielements/button';
import UserList from '../../components/users/userList';
import SingleUserView from '../../components/users/singleView';
import EditUserView from '../../components/users/editView';
import DeleteButton from '../../components/users/deleteButton';
//import { otherAttributes } from './fakeData';
import IntlMessages from '../../components/utility/intlMessages';
import { UsersWrapper } from './users.style';

const {
  fetchUsers,
  changeUser,
  addUser,
  editUser,
  deleteUser,
  viewChange
} = UserAction;



const { Content } = Layout;
class Users extends Component {
  componentWillMount() {
    this.props.fetchUsers()
  }
  render() {

    const {    
      users,
      selectedId,
      editView,
      changeUser,
      addUser,
      editUser,
      deleteUser,
      viewChange
    } = this.props;
    const selectedUser = selectedId
      ? users.filter(user => user.id === selectedId)[0]
      : null;
    const onViewChange = () => viewChange(!editView);
    const otherAttributes = [
      { title: 'First Name', value: 'firstName', type: 'name' },
      { title: 'Last Name', value: 'lastName', type: 'name' },
      { title: 'Email', value: 'email', type: 'email' },
      { title: 'Role', value: 'role', type: 'position' },
      { title: 'Notes', value: 'note', type: 'paragraph' }
    ];
    console.log(this.props);
    return (
      <UsersWrapper
        className="Users"
        style={{ background: 'none' }}
      >
        <div className="UserListBar">
          <UserList
            users={users}
            selectedId={selectedId}
            changeUser={changeUser}
            deleteUser={deleteUser}
          />
        </div>
        <Layout className="UserBoxWrapper">
          {selectedUser ? (
            <Content className="UserBox">
              <div className="UserControl">
                <Button type="button" onClick={onViewChange}>
                  {editView ? <Icon type="check" /> : <Icon type="edit" />}{' '}
                </Button>
                <DeleteButton
                  deleteUser={deleteUser}
                  user={selectedUser}
                />
                <Button
                  type="primary"
                  onClick={addUser}
                  className="AddUserBtn"
                >
                  <IntlMessages id="userlist.addNewUser" />
                </Button>
              </div>
              {editView ? (
                <EditUserView
                  user={selectedUser}
                  editUser={editUser}
                  otherAttributes={otherAttributes}
                />
              ) : (
                <SingleUserView
                  user={selectedUser}
                  otherAttributes={otherAttributes}
                />
              )}
            </Content>
          ) : (
            <div className="UserControl">
              <Button
                type="primary"
                onClick={addUser}
                className="AddUserBtn"
              >
                <IntlMessages id="userlist.addNewUser" />
              </Button>
            </div>
          )}
        </Layout>
      </UsersWrapper>
    );
  }
}

function mapStateToProps(state) {
  const { users, selectedId, editView } = state.Users;
  return {
    users,
    selectedId,
    editView
  };
}
export default connect(mapStateToProps, {
  fetchUsers,
  changeUser,
  addUser,
  editUser,
  deleteUser,
  viewChange
})(Users);
