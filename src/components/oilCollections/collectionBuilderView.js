import React, { Component } from 'react';
import CollectionBuilder from './collectionBuilder'
import { CollectionCardWrapper } from './collectionCard.style';


class CollectionBuilderView extends Component {

  render() {
    console.log("Builder View----->", this.props)
    const collection = this.props.collection
    return (
      <CollectionCardWrapper className="CollectionCard">
        <CollectionBuilder 
          collection={collection}
        />
      </CollectionCardWrapper>
    );
  }
}


export default CollectionBuilderView