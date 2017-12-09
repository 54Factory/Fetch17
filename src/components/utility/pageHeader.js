import React from 'react';
import { ComponentTitleWrapper } from './pageHeader.style';

export default props =>
  <ComponentTitleWrapper className="ComponentTitle">
    {props.children}
  </ComponentTitleWrapper>;
