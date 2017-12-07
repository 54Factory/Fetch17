import React, { Component } from 'react';
import LayoutContentWrapper from '../components/utility/layoutWrapper';
import LayoutContent from '../components/utility/layoutContent';
import CollectionBuilder from '../components/oilCollections/collectionBuilderView'
export default class extends Component {
  render() {
    return (
      <LayoutContentWrapper style={{ height: '100vh' }}>
        <LayoutContent>
          <h1>Admin Page</h1>
          <CollectionBuilder />
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}
