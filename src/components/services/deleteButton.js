import React, { Component } from 'react';
import Popconfirm from '../feedback/popconfirm';
import Button from '../uielements/button';
import notification from '../notification';

export default class DeleteButton extends Component {
  render() {
    const { service, deleteService } = this.props;
    let name = '';
    if (service.name) {
      name = `${service.name} `;
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
          deleteService(service.id);
        }}
      >
        <Button icon="close" type="button" className="DeleteBtn" />
      </Popconfirm>
    );
  }
}
