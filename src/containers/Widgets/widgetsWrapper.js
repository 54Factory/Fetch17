import React from 'react';
import { WidgetWrapper } from './style';

export default class WidgetsWrapper extends React.Component {
  render() {
    const {
      width,
      gutterTop,
      gutterRight,
      gutterBottom,
      gutterLeft,
      padding,
      bgColor,
      children,
    } = this.props;
    const wrapperStyle = {
      width: width,
      marginTop: gutterTop,
      marginRight: gutterRight,
      marginBottom: gutterBottom,
      marginLeft: gutterLeft,
      padding: padding,
      backgroundColor: bgColor,
    };

    return (
      <WidgetWrapper className="WidgetsWrapper" style={wrapperStyle}>
        {children}
      </WidgetWrapper>
    );
  }
}
