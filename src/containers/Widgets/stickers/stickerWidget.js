import React from 'react';
import { StickerWidgetWrapper } from './style';

export default class StickerWidget extends React.Component {
  render() {
    const { fontColor, bgColor, width, icon, number, text } = this.props;

    const textColor = {
      color: fontColor,
    };
    const widgetStyle = {
      backgroundColor: bgColor,
      width: width,
    };
    const iconStyle = {
      color: fontColor,
    };

    return (
      <StickerWidgetWrapper className="StickerWidget" style={widgetStyle}>
        <div className="IconWrapper">
          <i className={icon} style={iconStyle} />
        </div>

        <div className="ContentWrapper">
          <h3 className="StatNumber" style={textColor}>
            {number}
          </h3>
          <span className="Label" style={textColor}>
            {text}
          </span>
        </div>
      </StickerWidgetWrapper>
    );
  }
}
