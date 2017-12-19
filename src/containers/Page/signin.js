import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import IntlMessages from '../../components/utility/intlMessages';
import SignInStyleWrapper from './signin.style';
import SignInForm from '../Auth/SignInForm'


class SignIn extends React.Component {
  state = {
    redirectToReferrer: false,
  };
  componentDidMount() {
    if(this.props.isLoggedIn) {
      this.setState({ redirectToReferrer: true });
    }

  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }

  render() {
    console.log(this.props);
    const from = { pathname: '/dashboard' };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="SignInPage">
        <div className="LoginContentWrapper">
          <div className="LoginContent">
            <div className="LogoWrapper">
              <Link to="/dashboard">
                <IntlMessages id="page.signInTitle" />
              </Link>
            </div>
            <div className="SignInForm">
              <div className="InputWrapper">
                <SignInForm />
              </div>
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.user.token !== null ? true : false,

  }),
  // { login }
)(SignIn);
