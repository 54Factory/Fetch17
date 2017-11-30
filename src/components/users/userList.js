import React, { Component } from 'react';
import IntlMessages from '../utility/intlMessages';
import { InputSearch } from '../uielements/input';
import DeleteButton from './deleteButton';
import { PropTypes } from 'prop-types';
import { UserListWrapper } from './userList.style';

function filterUsers(users, search) {
  search = search.toUpperCase();
  return search
    ? users.filter(user => user.name.toUpperCase().includes(search))
    : users;
}

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.singleUser = this.singleUser.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      search: ''
    };
  }
  singleUser(user) {
    const { selectedId, deleteUser, changeUser } = this.props;
    const activeClass = selectedId === user.id ? 'active' : '';
    const onChange = () => changeUser(user.id);
    return (
      <div
        key={user.id}
        className={`${activeClass} SingleUser`}
        onClick={onChange}
      >
        <div className="Avatar">
          {user.avatar ? <img alt="#" src={user.avatar} /> : ''}
        </div>
        <div className="UserName">
          <h3>{user.username ? user.username : 'No Name'}</h3>
        </div>
        <DeleteButton deleteUser={deleteUser} user={user} />
      </div>
    );
  }
  onChange(event) {
    this.setState({ search: event.target.value });
  }
  render() {
    const { search } = this.state;
    const users = filterUsers(this.props.users, search);
    return (
      <UserListWrapper className="UserListWrapper">
        <InputSearch
          placeholder={this.context.intl.formatMessage({
            id: 'userlist.searchUsers'
          })}
          value={search}
          onChange={this.onChange}
          className="SearchBar"
        />
        {users && users.length > 0 ? (
          <div className="UserList">
            {users.map(user => this.singleUser(user))}
          </div>
        ) : (
          <span className="NoResultMsg">
            {<IntlMessages id="Component.users.noOption" />}
          </span>
        )}
      </UserListWrapper>
    );
  }
}

UserList.contextTypes = {
  intl: PropTypes.object.isRequired
};
