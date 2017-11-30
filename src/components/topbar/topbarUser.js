import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popover from '../uielements/popover';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'
import * as actionType from '../../redux/authorize/actions';
import TopbarDropdownWrapper from './topbarDropdown.style';

const { logoutUser } = actionType;

class TopbarUser extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false,
    };
  }
  hide() {
    this.setState({ visible: false });
  }
  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    if (this.props.data && this.props.data.loading) { return (<div>Loading...</div>)}
    if (this.props.data && this.props.data.error) { return (<div>Error...</div>)}
    const content = (
      <TopbarDropdownWrapper className="isoUserDropdown">
        <a className="isoDropdownLink" onClick={this.props.logoutUser}>
          Logout
        </a>
      </TopbarDropdownWrapper>
    );

    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        arrowPointAtCenter={true}
        placement="bottomLeft"
      >
        <div className="isoImgWrapper">    
          <img alt="user" src={this.props.data.User.avatar} />
          <span className="userActivity online" />       
        </div>
      </Popover>
    );
  }
}

const USER_QUERY = gql`
query User ($id: ID!){
  User(id: $id) {
    id
    role
    username
    avatar
  }
}
`
const CONNECTED_USER_QUERY = graphql(USER_QUERY, {
options: (props) => ({
  variables: {
    id: props.user.userId
  }
})
})(TopbarUser)


const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { logoutUser })(CONNECTED_USER_QUERY);
