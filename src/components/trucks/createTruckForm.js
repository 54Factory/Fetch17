import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'
import { Input } from 'antd';
import Box from '../../components/utility/box';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import ContentHolder from '../../components/utility/contentHolder';
import IntlMessages from '../../components/utility/intlMessages';

const InputGroup = Input.Group;

class CreateTruckForm extends React.Component {

  constructor(props){
    super(props)
    console.log(this.props)
  }

  state = {
    name: '',
    nickname: '',
    image: '',
    description: ''
  };


  render() {
    if (this.props.data && this.props.data.loading) { return (<div>Loading...</div>)}
    if (this.props.data && this.props.data.error) { return (<div>Error...</div>)}
    console.log(this.state)
    console.log(this.props)

    // const rowStyle = {
    //   width: '100%',
    //   display: 'flex',
    //   flexFlow: 'row wrap'
    // };
    // const colStyle = {
    //   marginBottom: '16px',
    // };
    // const gutter = 16;
    return(
      <LayoutWrapper>
      {/* <Row style={rowStyle} gutter={gutter} justify="start">
        <Col md={12} sm={12} xs={24} style={colStyle}> */}
          <Box 
            title={<IntlMessages id="forms.truck.createTruck.header" />}
            subtitle={`Please fill out all fields below`}
          >
            <ContentHolder>
              <InputGroup size="large" style={{ marginBottom: '15px' }}>
              <Input 
                placeholder="Name"
                style={{ marginBottom: '15px' }} 
                onChange={event => this.setState({ name: event.target.value })}
                value={this.state.name}
              />
              <Input 
                placeholder="Nickname"
                style={{ marginBottom: '15px' }}
                onChange={event => this.setState({ nickname: event.target.value })}
                value={this.state.nickname}
              />
              <Input 
                placeholder="Image" 
                style={{ marginBottom: '15px' }}
                onChange={event => this.setState({ image: event.target.value })}
                value={this.state.image}
              />
              <Input 
                placeholder="Description" 
                style={{ marginBottom: '15px' }}
                onChange={event => this.setState({ description: event.target.value })}
                value={this.state.description}
              />
              {/* <Input 
                placeholder="Notes:"  
                type="textarea" 
                rows={10} 
                autosize={{ minRows: 6, maxRows: 10 }}
                onChange={event => this.setState({ content: event.target.value })}
                value={this.state.content}
              /> */}
              </InputGroup> 
              <button onClick={this.onSubmit}>Create Truck</button>   
            </ContentHolder>
          </Box>
        {/* </Col>
        </Row> */}
        </LayoutWrapper>
    )
  }
  onSubmit = async () => {
    const { name, nickname, image, description } = this.state;
    await this.props.CreateTruck({variables: { name, nickname, image, description }});

     window.location.pathname = `/dashboard/trucks`
  }
}

const CreateTruck = gql`
mutation CreateTruck($name: String!, $image: String!, $nickname: String, $description: String!){
  createTruck(name: $name, image: $image, nickname: $nickname, description: $description) {
    id
    name
    nickname
    description
  }
}
`

export default graphql(CreateTruck, {name: 'CreateTruck'})(CreateTruckForm)