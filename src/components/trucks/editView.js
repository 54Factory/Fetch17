import React, { Component } from 'react';
import { Icon } from 'antd';
import Input from '../uielements/input';
import Upload from '../uielements/upload';
import notification from '../notification';
import { TruckCardWrapper } from './truckCard.style';
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
export default class editTruckView extends Component {
  render() {
    const { truck, otherAttributes } = this.props;
    const name = truck.name ? truck.name : 'No Name';
    const extraInfos = [];
    const names = [
      { value: 'name', title: 'First Name' }
    ];
    [...names, ...otherAttributes].forEach(attribute => {
      const value = truck[attribute.value];
      const editTruck = event => {
        truck[attribute.value] = event.target.value;
        let name = '';
        if (truck.name) {
          name = `${truck.name} `;
        }
        truck.name = name;
        this.props.editTruck(truck);
      };
      if (attribute.value === 'note') {
        extraInfos.push(
          <div className="TruckCardInfos" key={attribute.value}>
            <p className="TruckInfoLabel">{`${attribute.title}`}</p>
            <Input
              placeholder={`${attribute.title}`}
              value={value}
              type="textarea"
              rows={5}
              onChange={event => editTruck(event)}
            />
          </div>
        );
      } else {
        extraInfos.push(
          <div className="TruckCardInfos" key={attribute.value}>
            <p className="TruckInfoLabel">{`${attribute.title}`}</p>
            <Input
              placeholder={`${attribute.title}`}
              value={value}
              onChange={event => editTruck(event)}
            />
          </div>
        );
      }
    });
    return (
      <TruckCardWrapper className="TruckCard">
        <div className="TruckCardHead">
          <div className="PersonImage">
            <Upload
              className="avatar-uploader"
              name="avatar"
              showUploadList={false}
              beforeUpload={beforeUpload}
              action=""
            >
              {truck.image
                ? <img src={truck.image} alt="" className="avatar" />
                : ''}
              <Icon type="plus" className="avatar-uploader-trigger" />
            </Upload>
          </div>
          <h1 className="PersonName">
            {name}
          </h1>
        </div>
        <div className="TruckInfoWrapper">
          {extraInfos}
        </div>
      </TruckCardWrapper>
    );
  }
}
