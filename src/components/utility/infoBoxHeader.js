import React from 'react';
import { ComponentTitleWrapper } from './infoBoxHeader.style';

export default props =>
  <ComponentTitleWrapper className="infoComponentTitle">
    {props.children}
  </ComponentTitleWrapper>;
