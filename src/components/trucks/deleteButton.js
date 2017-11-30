import React, { Component } from 'react';
import Popconfirm from '../feedback/popconfirm';
import Button from '../uielements/button';
import notification from '../notification';

export default class DeleteButton extends Component {
  render() {
    const { truck, deleteTruck } = this.props;
    let name = '';
    if (truck.name) {
      name = `${truck.name} `;
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
          deleteTruck(truck.id);
        }}
      >
        <Button icon="close" type="button" className="DeleteBtn" />
      </Popconfirm>
    );
  }
}
