import * as actionTypes from '../actions/actionTypes';

const loginState = {
    token: null,
    loading: false,
    username: null,
    errorMessage: null,
    alertMessage: null,
}

export const login = (state = loginState, { type, ...payload }) => {
    switch (type) {
      case actionTypes.LOGIN_USER_REQUEST:
        return {
          ...loginState,
          loading: true,
          username: payload.username,
        };
      case actionTypes.LOGIN_USER_SUCCESS:
        return {
          ...state,
          successMessage: payload.message,
          loading: false,
        };
      case actionTypes.LOGIN_USER_ERROR:
        return {
          ...state,
          loading: false,
          errorMessage: payload.message,
        };
      default:
        return state;
    }
  };

  const registerState = {
    errorMessage: null,
    successMessage: null,
    loading: false,
    username: null,
  };
  
  export const register = (state = registerState, { type, ...payload }) => {
    switch (type) {
      case actionTypes.CREATE_USER_REQUEST:
        return {
          ...registerState,
          loading: true,
          username: payload.username,
        };
      case actionTypes.CREATE_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          errorMessage: null,
          successMessage: payload.message,
        };
      case actionTypes.CREATE_USER_ERROR:
        return {
          ...state,
          loading: false,
          successMessage: null,
          errorMessage: payload.message,
        };
      default:
        return state;
    }
  };

  const userState = {
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role'),
    userId: localStorage.getItem('userId'),
  };
  
  export const user = (state = userState, { type, ...payload }) => {
    switch (type) {
      case actionTypes.SET_USER_TOKEN:
        return {
          ...state,
          token: payload.token,
          role: payload.role,
          userId: payload.userId,
        };
      case actionTypes.LOGOUT_USER:
        return {
          ...state,
          token: null,
          role: null,
          userId: null
        };
      default:
        return state;
    }
  };