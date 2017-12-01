import React, { Component } from 'react';
import Popconfirm from '../feedback/popconfirm';
import Button from '../uielements/button';
import notification from '../notification';

export default class DeleteButton extends Component {
  render() {
    const { setup, deleteSetUp } = this.props;
    let name = '';
    if (setup.name) {
      name = `${setup.name} `;
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
          deleteSetUp(setup.id);
        }}
      >
        <Button icon="close" type="button" className="DeleteBtn" />
      </Popconfirm>
    );
  }
}
