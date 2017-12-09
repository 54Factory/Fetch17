import React, { Component } from 'react';
import { Layout } from 'antd';
import { FormsWrapper } from './forms.style';
import CustomerForm from '../Customer/customerForm'




const { Content } = Layout;
class CreateForms extends Component {

  render() {
    
    const otherAttributes = [
      { title: 'License #', value: 'dlNumber', type: 'license' }
    ];
    const driverAttributes = [
      { title: 'Assigned Truck', value: 'name', type: 'name' }
    ];
    
    console.log(this.props);
    return (
      <FormsWrapper
        className="CreateForms"
        style={{ background: 'none' }}
      >
        <Layout className="CreateFormBoxWrapper">  
            <Content className="CreateFormBox">
              <CustomerForm />
            </Content> 
        </Layout>
      </FormsWrapper>
    );
  }
}

export default CreateForms;
