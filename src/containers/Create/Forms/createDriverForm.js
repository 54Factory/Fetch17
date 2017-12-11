import React, { Component } from 'react';
import { Col, Row } from 'antd';
import Input from '../../../components/uielements/input';
import Select, { SelectOption } from '../../../components/uielements/select';
import { FormCardWrapper } from './formCard.style';

const Option = SelectOption;


export default class CreateDriverForm extends Component {

  userSelectorChange(value) {
    const fieldName = 'userId';
    const fieldValue = value;
    this.props.onUserSelectorChange(fieldName, fieldValue);
    console.log(`selected ${value}`);
}

  onFieldChange(event) {
    // for a regular input field, read field name and value from the event
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    this.props.onChange(fieldName, fieldValue);
  }

  render() {
    console.log(this.props)
    const rowStyle = {
      width: '100%',
      display: 'flex',
      flexFlow: 'row wrap',
    };
    const colStyle = {
      marginBottom: '16px',
    };
    const gutter = 16;



    return (
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
          <h1 style={{ color: 'red'}}>Danger! Can create multiple drivers for same user at this point, still need conditionals.</h1>

              <FormCardWrapper>
              <div className="FormInfoWrapper">
          <div className="FormCardInfos">
            {/* <p className="FormInfoLabel">Select User</p> */}
            <Select 
              style={{ width: '100%' }} 
              placeholder="Select User"
              onChange={this.userSelectorChange.bind(this)}
            >
            {this.props.users.map(user => {
              return (
                <Option key={user.id} value={user.id}>{user.firstName} {user.lastName}</Option>
              )           
            })}               
            </Select>
          </div>
          <div className="FormCardInfos">
            <p className="FormInfoLabel">Driver's License No.</p>
            <Input 
              placeholder='Drivers License No.' 
              style={{ marginBottom: '15px' }}
              name='dlNumber'
              onChange={this.onFieldChange.bind(this)}
            />
          </div>
        </div>
              </FormCardWrapper>
          </Col>
        </Row>    
    );
  }
}
