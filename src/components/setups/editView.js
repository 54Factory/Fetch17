import React, { Component } from 'react';
import { Icon } from 'antd';
import Input from '../uielements/input';
import Upload from '../uielements/upload';
import notification from '../notification';
import { SetUpCardWrapper } from './setUpCard.style';
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
export default class editSetUpView extends Component {
  render() {
    const { setup, otherAttributes } = this.props;
    const name = setup.locationName ? setup.locationName : 'No Name';
    const extraInfos = [];
    const names = [
      { value: 'name', title: 'First Name' }
    ];
    [...names, ...otherAttributes].forEach(attribute => {
      const value = setup[attribute.value];
      const editSetUp = event => {
        setup[attribute.value] = event.target.value;
        let name = '';
        if (setup.name) {
          name = `${setup.name} `;
        }
        setup.name = name;
        this.props.editSetUp(setup);
      };
      if (attribute.value === 'note') {
        extraInfos.push(
          <div className="SetUpCardInfos" key={attribute.value}>
            <p className="SetUpInfoLabel">{`${attribute.title}`}</p>
            <Input
              placeholder={`${attribute.title}`}
              value={value}
              type="textarea"
              rows={5}
              onChange={event => editSetUp(event)}
            />
          </div>
        );
      } else {
        extraInfos.push(
          <div className="SetUpCardInfos" key={attribute.value}>
            <p className="SetUpInfoLabel">{`${attribute.title}`}</p>
            <Input
              placeholder={`${attribute.title}`}
              value={value}
              onChange={event => editSetUp(event)}
            />
          </div>
        );
      }
    });
    return (
      <SetUpCardWrapper className="SetUpCard">
        <div className="SetUpCardHead">
          <div className="PersonImage">
            <Upload
              className="avatar-uploader"
              name="avatar"
              showUploadList={false}
              beforeUpload={beforeUpload}
              action=""
            >
              {setup.image
                ? <img src={setup.image} alt="" className="avatar" />
                : ''}
              <Icon type="plus" className="avatar-uploader-trigger" />
            </Upload>
          </div>
          <h1 className="PersonName">
            {name}
          </h1>
        </div>
        <div className="SetUpInfoWrapper">
          {extraInfos}
        </div>
      </SetUpCardWrapper>
    );
  }
}
