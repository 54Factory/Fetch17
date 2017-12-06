import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd';
import basicStyle from '../../../config/basicStyle';
import WidgetsWrapper from '../widgetsWrapper';
import StickerWidget from '../stickers/stickerWidget';
import IntlMessages from '../../../components/utility/intlMessages';


export default class OilCollectionWidgets extends Component {

 

  render() {
    const {
      unassignedAccounts
    } = this.props
    console.log(unassignedAccounts)
    const { rowStyle, stickerColStyle } = basicStyle;
    const oilCollectionWidgetsStyle = {
      display: 'flex',
      flexFlow: 'row wrap',
      alignItems: 'flex-start',
      padding: '15px 0px',
      overflow: 'hidden'
    };

    return (
      <div style={oilCollectionWidgetsStyle}>
        <Row style={rowStyle} gutter={0} justify="start">
          <Col md={12} sm={12} xs={24} style={stickerColStyle}>
            <WidgetsWrapper>
              {/* Sticker Widget */}
              <Link to={"/dashboard/oilcollection/unassigned"}>
              <StickerWidget
                number={unassignedAccounts.length}
                text={<IntlMessages id="stickers.unassignedAccountsSticker" />}
                icon="ion-alert-circled"
                fontColor="#ffffff"
                bgColor="#FFCA28"
              />
              </Link>
            </WidgetsWrapper>
          </Col>

          <Col md={12} sm={12} xs={24} style={stickerColStyle}>
            <WidgetsWrapper>
              {/* Sticker Widget */}
              <StickerWidget
                number={953}
                text="Total Active Accounts"
                icon="ion-soup-can"
                fontColor="#ffffff"
                bgColor="#14AD3D"
              />
            </WidgetsWrapper>
          </Col>
        </Row>
      </div>
    );
  }
}
