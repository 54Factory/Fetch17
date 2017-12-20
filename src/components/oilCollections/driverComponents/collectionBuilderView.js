import React, { Component } from 'react';
import CollectionBuilder from './collectionBuilder'


class CollectionBuilderView extends Component {

  render() {
    const collection = this.props.collection
    console.log("Builder View----->", this.props)
    console.log("Builder View Collection----->", collection)
    
    return (
      <CollectionBuilder 
        collection={collection}
      />
    );
  }
}


export default CollectionBuilderView