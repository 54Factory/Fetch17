import React, { Component } from 'react';
import { Icon } from 'antd';
import Input from '../uielements/input';
import Upload from '../uielements/upload';
import notification from '../notification';
import { DriverCardWrapper } from './driverCard.style';
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
export default class editDriverView extends Component {
  render() {
    const { driver, otherAttributes } = this.props;
    const name = driver.firstName ? driver.firstName : 'No Name';
    const extraInfos = [];
    const names = [
      { value: 'firstName', title: 'First Name' },
      { value: 'lastName', title: 'Last Name' },
    ];
    [...names, ...otherAttributes].forEach(attribute => {
      const value = driver[attribute.value];
      const editDriver = event => {
        driver[attribute.value] = event.target.value;
        let name = '';
        if (driver.firstName) {
          name = `${driver.firstName} `;
        }
        if (driver.lastName) {
          name = `${name}${driver.lastName}`;
        }
        driver.name = name;
        this.props.editDriver(driver);
      };
      if (attribute.value === 'note') {
        extraInfos.push(
          <div className="DriverCardInfos" key={attribute.value}>
            <p className="DriverInfoLabel">{`${attribute.title}`}</p>
            <Input
              placeholder={`${attribute.title}`}
              value={value}
              type="textarea"
              rows={5}
              onChange={event => editDriver(event)}
            />
          </div>
        );
      } else {
        extraInfos.push(
          <div className="DriverCardInfos" key={attribute.value}>
            <p className="DriverInfoLabel">{`${attribute.title}`}</p>
            <Input
              placeholder={`${attribute.title}`}
              value={value}
              onChange={event => editDriver(event)}
            />
          </div>
        );
      }
    });
    return (
      <DriverCardWrapper className="DriverCard">
        <div className="DriverCardHead">
          <div className="PersonImage">
            <Upload
              className="avatar-uploader"
              name="avatar"
              showUploadList={false}
              beforeUpload={beforeUpload}
              action=""
            >
              {driver.avatar
                ? <img src={driver.avatar} alt="" className="avatar" />
                : ''}
              <Icon type="plus" className="avatar-uploader-trigger" />
            </Upload>
          </div>
          <h1 className="PersonName">
            {name}
          </h1>
        </div>
        <div className="DriverInfoWrapper">
          {extraInfos}
        </div>
      </DriverCardWrapper>
    );
  }
}
