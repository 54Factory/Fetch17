import React, { Component } from 'react';
import CollectionBuilder from './collectionBuilder'
import { CollectionCardWrapper } from './collectionCard.style';


class CollectionBuilderView extends Component {

  render() {
    console.log(this.props)

    return (
      <CollectionCardWrapper className="CollectionCard">
        <CollectionBuilder />
      </CollectionCardWrapper>
    );
  }
}


export default CollectionBuilderView