import React, { Component } from 'react';
import { Icon } from 'antd';
import Input from '../uielements/input';
import Upload from '../uielements/upload';
import notification from '../notification';
import { LocationCardWrapper } from './locationCard.style';
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
export default class editLocationView extends Component {
  render() {
    const { location, otherAttributes } = this.props;
    const name = location.locationName ? location.locationName : 'No Name';
    const extraInfos = [];
    const names = [
      { value: 'name', title: 'First Name' }
    ];
    [...names, ...otherAttributes].forEach(attribute => {
      const value = location[attribute.value];
      const editLocation = event => {
        location[attribute.value] = event.target.value;
        let name = '';
        if (location.name) {
          name = `${location.name} `;
        }
        location.name = name;
        this.props.editLocation(location);
      };
      if (attribute.value === 'note') {
        extraInfos.push(
          <div className="LocationCardInfos" key={attribute.value}>
            <p className="LocationInfoLabel">{`${attribute.title}`}</p>
            <Input
              placeholder={`${attribute.title}`}
              value={value}
              type="textarea"
              rows={5}
              onChange={event => editLocation(event)}
            />
          </div>
        );
      } else {
        extraInfos.push(
          <div className="LocationCardInfos" key={attribute.value}>
            <p className="LocationInfoLabel">{`${attribute.title}`}</p>
            <Input
              placeholder={`${attribute.title}`}
              value={value}
              onChange={event => editLocation(event)}
            />
          </div>
        );
      }
    });
    return (
      <LocationCardWrapper className="LocationCard">
        <div className="LocationCardHead">
          <div className="PersonImage">
            <Upload
              className="avatar-uploader"
              name="avatar"
              showUploadList={false}
              beforeUpload={beforeUpload}
              action=""
            >
              {location.image
                ? <img src={location.image} alt="" className="avatar" />
                : ''}
              <Icon type="plus" className="avatar-uploader-trigger" />
            </Upload>
          </div>
          <h1 className="PersonName">
            {name}
          </h1>
        </div>
        <div className="LocationInfoWrapper">
          {extraInfos}
        </div>
      </LocationCardWrapper>
    );
  }
}
