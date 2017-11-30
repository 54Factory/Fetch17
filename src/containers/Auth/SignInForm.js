import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import * as actionTypes from '../../redux/authorize/actions';
import SignInForm from '../../components/auth/SignInForm';
import { loginUser } from '../../graphql/mutations';


const withMutation = graphql(loginUser, {
  props: ({ mutate }) => ({
    loginUser: ({username, password}) => mutate({
      variables: { username, password },
    }),
  }),
});

const mapStateToProps = state => ({
  ...state.login,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: ({ username, password }) => {
    dispatch(actionTypes.loginUserRequest({ username }));

    ownProps.loginUser({ username, password })
    .then((data) => {
      const token = data.data.authenticateUser.token;
      const role = data.data.authenticateUser.role;
      const userId = data.data.authenticateUser.id;
      console.log(data)
      dispatch(actionTypes.loginUserSuccess());
      dispatch(actionTypes.setUserToken({ token, role, userId }));
    }).catch((error) => {
      dispatch(actionTypes.loginUserError({
        error,
      }));
    });
  },
});

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(SignInForm));
