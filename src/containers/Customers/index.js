import React from 'react';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
//import LayoutWrapper from '../../components/utility/layoutWrapper';
import PageHeader from '../../components/utility/pageHeader';
import IntlMessages from '../../components/utility/intlMessages';
import Loading from '../Loading';

import { Layout } from "antd";
import basicStyle from '../../config/basicStyle';
import CustomerList from '../../components/customers/customerList';
import { Col, Row } from 'antd';
import { CustomersWrapper } from './customers.style';

const { Sider, Content } = Layout;

class Customers extends React.Component {
  render() {
    const { rowStyle, colStyle } = basicStyle;

    if (this.props.Customers.loading) {return <Loading />;}
    const {
      allCustomers
    } = this.props.Customers;
    
    return (
      <CustomersWrapper className="isomorphicCustomers" style={{ background: "none" }}>
        <PageHeader><IntlMessages id="customers.index" /></PageHeader>
        <Sider width="300" className="isoCustomerListBar" >
          <CustomerList
            customers={allCustomers}
          />
        </Sider>
        <Content className="isoCustomerBox">
          <div className="isoCustomerControl">
            <Row style={rowStyle} gutter={0} justify="start">
              <Col md={12} sm={24} xs={24} style={colStyle}>
       
              </Col>
            </Row>
          </div>      
        </Content>
      </CustomersWrapper>
    )
  }
}

const allCustomersQuery = gql`
  query Customers {
    allCustomers(orderBy: createdAt_ASC) {
      id
      firstName
      lastName
      image
      phone
      email
      role
      customerNotes{
        customerNoteContent
      }
      locations {
        locationName
      }
    }
  }
`;

  const CustomerIndexPageWithData = withApollo(graphql(allCustomersQuery, {
    name: 'Customers',
    options: {
      fetchPolicy: 'network-only'
    },
  })(Customers));
  
  export default CustomerIndexPageWithData
 

