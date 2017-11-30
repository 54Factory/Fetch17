import React, { Component } from 'react';
import { UserCardWrapper } from './userCard.style';

export default class SingleUserView extends Component {
  render() {
    const { user, otherAttributes } = this.props;
    const name = user.username ? user.username : 'No Name';
    const extraInfos = [];
    otherAttributes.forEach(attribute => {
      const value = user[attribute.value];
      if (value) {
        extraInfos.push(
          <div className="UserCardInfos" key={attribute.value}>
            <p className="UserInfoLabel">{`${attribute.title}`}</p>
            <p className="UserInfoDetails">
              {value}
            </p>
          </div>
        );
      }
    });
    return (
      <UserCardWrapper className="UserCard">
        <div className="UserCardHead">
          <div className="PersonImage">
            {user.avatar ? <img alt="#" src={user.avatar} /> : ''}
          </div>
          <h1 className="PersonName">
            {name}
          </h1>
        </div>
        <div className="UserInfoWrapper">
          {extraInfos}
        </div>
      </UserCardWrapper>
    );
  }
}
