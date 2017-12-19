import React from 'react';
import LayoutContentWrapper from '../components/utility/layoutWrapper';
import LayoutContent from '../components/utility/layoutContent';

export default class extends React.Component {
  render() {
    return (
      <LayoutContentWrapper style={{ height: '100vh' }}>
        <LayoutContent>
          <h1>Driver Page</h1>
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}
