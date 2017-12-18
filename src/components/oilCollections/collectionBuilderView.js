import React, { Component } from 'react';
import CollectionBuilder from './collectionBuilder'


class CollectionBuilderView extends Component {

  render() {
    console.log("Builder View----->", this.props)
    const collection = this.props.collection
    return (
      <CollectionBuilder 
        collection={collection}
      />
    );
  }
}


export default CollectionBuilderView