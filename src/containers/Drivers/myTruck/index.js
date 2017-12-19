import React from 'react';
import { Row, Col } from 'antd';
import { TankCapacity } from './tankCapacityProgress';
import PageHeader from '../../../components/utility/pageHeader';
import Box from '../../../components/utility/box';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import ContentHolder from '../../../components/utility/contentHolder';
import basicStyle from '../../../config/basicStyle';
import IntlMessages from '../../../components/utility/intlMessages';
import Card from './card.style';


export default class MyTruck extends React.Component {
  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const capacity = 1750
    const progress = .5
    const currentlyFilled = capacity * progress 
    

    return (
      <LayoutWrapper>
        <PageHeader>{<IntlMessages id="driver.myTruck" />}</PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Box
              title={<IntlMessages id="driver.myTruckInfo" />}
            >
              <ContentHolder>
                <Card
                  style={{ width: '100%' }}
                >
                <div className="custom-image" >
                  <img
                    alt="example"
                    width="100%"
                    src="https://cdn1.commercialtrucktrader.com/v1/media/5a158256eaacc76e4260d4a3.jpg?width=300&height=225"
                  />
                  <p>Type: International</p>
                  <p>Year: 2009</p>
                  <p>Hours: 10,983</p>
                  <p>Miles: 100,324</p>
                  <p>Plate: ZCY 4710</p> 
                </div>   
                </Card>
              </ContentHolder>
            </Box>
          </Col>
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Box
              title={<IntlMessages id="driver.myTruckCapacity" />}
            >
              <ContentHolder>
                <Card
                  style={{ width: '100%' }}
                >
                  <div style={{ marginTop: '10px', marginBottom: '10px', textAlign: 'center' }}>
                    <h3 style={{ marginBottom: '10px' }}>Currently Filled: {currentlyFilled} Gallons</h3>
                      <TankCapacity />
                    <p style={{ marginTop: '10px' }}>Capacity: {capacity} Gallons</p> 
                  </div>
                </Card>
              </ContentHolder>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
