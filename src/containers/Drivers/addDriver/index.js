import React from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Col, Button } from 'antd';
import Collapses from '../../../components/uielements/collapse';
import ContentHolder from '../../../components/utility/contentHolder';
import basicStyle from '../../../config/basicStyle';
import IntlMessages from '../../../components/utility/intlMessages';
import AddDriverForm from '../../Create/Forms/createDriverForm'
import CollapseWrapper from './collapse.style';


const Panel = Collapses.Panel;

const Collapse = props => (
  <CollapseWrapper>
    <Collapses {...props}>{props.children}</Collapses>
  </CollapseWrapper>
);

class CreateDriver extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      userId: '',
      dlNumber: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  setUserIdState(field, value) {
    // parent class change handler is always called with field name and value
    this.setState({[field]: value});
  }
  
  
  handleChange(field, value) {
    console.log(`selected ${value}`);
    this.setState({[field]: value})
    
  }

  callback = key => {};

  onSubmit = async () => {
    const { userId, dlNumber } = this.state;
    await this.props.CreateDriver({variables: { userId, dlNumber }});

     window.location.reload();
  }

  render() {
    console.log(this.state)
    const { collapseStyle } = basicStyle;
    return (
      <div style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }}>
          <Col md={24} sm={24} xs={24} style={collapseStyle}>
              <ContentHolder>
                <Collapse bordered={false}>
                  <Panel
                    header={<IntlMessages id="drivers.createDriver.collapse" />}
                    key="1"
                  >
                    <AddDriverForm
                      users={this.props.users}
                      onChange={this.handleChange.bind(this)}
                      onUserSelectorChange={this.setUserIdState.bind(this)}
                    />
                    <Button className="CreateBtn" onClick={this.onSubmit}>Create</Button>
                  </Panel>
                </Collapse>
              </ContentHolder>
          </Col>
      </div>

    );
  }
}

const CREATE_DRIVER_MUTATION = gql`
mutation CreateDriver ($userId: ID!, $dlNumber: String!){
  createDriver(userId: $userId, dlNumber: $dlNumber) {
    id 
  }
}
`

export default graphql(CREATE_DRIVER_MUTATION, {name: 'CreateDriver'})(CreateDriver)