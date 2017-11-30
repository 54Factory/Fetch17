import React, { Component } from 'react';
import { Icon } from 'antd';
import Input from '../uielements/input';
import Upload from '../uielements/upload';
import notification from '../notification';
import { UserCardWrapper } from './userCard.style';
import './upload.css';

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    notification('error', 'You can only upload JPG file!', '');
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    notification('error', 'Image must smaller than 2MB!', '');
    return false;
  }
  notification('success', 'Image uploaded successfully!', '');
  return true;
}
export default class editUserView extends Component {
  render() {
    const { user, otherAttributes } = this.props;
    const name = user.firstName ? user.firstName : 'No Name';
    const extraInfos = [];
    const names = [
      { value: 'firstName', title: 'First Name' },
      { value: 'lastName', title: 'Last Name' },
    ];
    [...names, ...otherAttributes].forEach(attribute => {
      const value = user[attribute.value];
      const editUser = event => {
        user[attribute.value] = event.target.value;
        let name = '';
        if (user.firstName) {
          name = `${user.firstName} `;
        }
        if (user.lastName) {
          name = `${name}${user.lastName}`;
        }
        user.name = name;
        this.props.editUser(user);
      };
      if (attribute.value === 'note') {
        extraInfos.push(
          <div className="UserCardInfos" key={attribute.value}>
            <p className="UserInfoLabel">{`${attribute.title}`}</p>
            <Input
              placeholder={`${attribute.title}`}
              value={value}
              type="textarea"
              rows={5}
              onChange={event => editUser(event)}
            />
          </div>
        );
      } else {
        extraInfos.push(
          <div className="UserCardInfos" key={attribute.value}>
            <p className="UserInfoLabel">{`${attribute.title}`}</p>
            <Input
              placeholder={`${attribute.title}`}
              value={value}
              onChange={event => editUser(event)}
            />
          </div>
        );
      }
    });
    return (
      <UserCardWrapper className="UserCard">
        <div className="UserCardHead">
          <div className="PersonImage">
            <Upload
              className="avatar-uploader"
              name="avatar"
              showUploadList={false}
              beforeUpload={beforeUpload}
              action=""
            >
              {user.avatar
                ? <img src={user.avatar} alt="" className="avatar" />
                : ''}
              <Icon type="plus" className="avatar-uploader-trigger" />
            </Upload>
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
