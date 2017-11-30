import * as actionTypes from './actionTypes'

export const createUserRequest = ({ username }) => ({
    type: actionTypes.CREATE_USER_REQUEST,
    username,
  });
  
  export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    message: 'User created successfully!',
  });
  
  export const createUserError = ({ error }) => ({
    type: actionTypes.CREATE_USER_ERROR,
    message: error.message,
  });
  
export const loginUserRequest = ({ username }) => ({
    type: actionTypes.LOGIN_USER_REQUEST,
    username,
  });
  
  export const loginUserSuccess = () => ({
    type: actionTypes.LOGIN_USER_SUCCESS,
    message: 'User logged in successfully!',
  });
  
  export const loginUserError = ({ error }) => ({
    type: actionTypes.LOGIN_USER_ERROR,
    message: error.message,
  });

// TESTING CODE FOR AUTH SIGN IN RESPONSE PROPS
// WORKING CODE BELOW...
  export const setUserToken = ({ token, role, userId }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('userId', userId);
    return {
      type: actionTypes.SET_USER_TOKEN,
      token,
      role,
      userId
    };
  };

// export const setUserToken = ({ token }) => {
//   localStorage.setItem('token', token);

//   return {
//     type: actionTypes.SET_USER_TOKEN,
//     token,
//   };
// };


export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.LOGOUT_USER,
  };
};
