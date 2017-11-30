
import gql from 'graphql-tag';

export default gql`
  mutation signupUser(email: String!, password: String!, username: String, role: String){
    signupUser(email: $email, password: $password, username: $username, role: $role) {
      id
      token,
      role
    }
  }
`;

