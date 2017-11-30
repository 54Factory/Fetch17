import React, { Component } from 'react';
import Popconfirm from '../feedback/popconfirm';
import Button from '../uielements/button';
import notification from '../notification';

export default class DeleteButton extends Component {
  render() {
    const { location, deleteLocation } = this.props;
    let name = '';
    if (location.name) {
      name = `${location.name} `;
    }
    if (!name) {
      name = 'No Name';
    }
    return (
      <Popconfirm
        title={`Sure to delete ${name}?`}
        okText="DELETE"
        cancelText="No"
        onConfirm={() => {
          notification('error', `Deleted ${name}`, '');
          deleteLocation(location.id);
        }}
      >
        <Button icon="close" type="button" className="DeleteBtn" />
      </Popconfirm>
    );
  }
}
