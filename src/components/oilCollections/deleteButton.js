import React, { Component } from 'react';
import Popconfirm from '../feedback/popconfirm';
import Button from '../uielements/button';
import notification from '../notification';

export default class DeleteButton extends Component {
  render() {
    const { collection, deleteCollection } = this.props;
    let name = '';
    if (collection.name) {
      name = `${collection.name} `;
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
          deleteCollection(collection.id);
        }}
      >
        <Button icon="close" type="button" className="DeleteBtn" />
      </Popconfirm>
    );
  }
}
