import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import * as actionTypes from '../../redux/users/actions';
import { signupUser } from '../mutations';
import NewContact from '../../components/users/editView';

const withMutation = graphql(signupUser, {
  props: ({ mutate }) => ({
    signupUser: ({username, password, email, role}) => mutate({
      variables: { username, password, email, role },
    }),
  }),
});

const mapStateToProps = state => ({
  ...state.register,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit({ username, password, email, role }) {
    dispatch(actionTypes.addUser({ username }));
    ownProps.signupUser({ username, password, email, role })
    .then(() => {
      dispatch(actionTypes.addUserSuccess());
    }).catch(error => dispatch(actionTypes.addUserError({ error })));
  },
});

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(NewContact));