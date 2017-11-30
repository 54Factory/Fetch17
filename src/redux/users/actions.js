import { client } from "../../client";
import { USER_QUERY } from "../../graphql/queries";
//import { contacts } from './reducer';
export const FETCH_USERS = "fetch_users";
export const FETCH_USER = "fetch_user";
export const CREATE_USER = "create_user";
export const DELETE_USER = "delete_user";
export const ADD_USER = 'ADD_USER';
export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_ERROR = 'ADD_USER_ERROR';
export const EDIT_USER = 'EDIT_USER';
export const DELETE__USER = 'DELETE__USER';
export const CHANGE_USER = 'CHANGE_USER';
export const EDIT_VIEW = 'EDIT_VIEW';


// export function fetchUsers() {
//   const request = client.query({ query: USER_QUERY })
//   console.log(request)
//   return {
//     type: FETCH_USERS,
//     payload: request    
//   };
// }
function ascendingSort(user1, user2) {
  const name1 = user1.firstName ? user1.lastName.toUpperCase() : '~';
  const name2 = user2.firstName ? user2.lastName.toUpperCase() : '~';
  return name1 > name2 ? 1 : name1 === name2 ? 0 : -1;
}

export function fetchUsers() {
  return client.query({ query: USER_QUERY })
    .then((response) => {
      return {
        type: FETCH_USERS,
        payload: response  
      };
    })
  }

  export function changeUser(id) {
    return {
      type: CHANGE_USER,
      id
    }
  }


export const addUser = ({ username }) => ({
  type: ADD_USER_REQUEST,
  username,
});

export const addUserSuccess = () => ({
  type: ADD_USER_SUCCESS,
  message: 'User created successfully!',
});

export const addUserError = ({ error }) => ({
  type: ADD_USER_ERROR,
  message: error.message,
});
    // export function addUser() {
    //   const newUser = {
    //     id: new Date(),
    //     firstName: '',
    //     lastName: '',
    //     username: '',
    //     avatar: '',
    //     phone: '',
    //     email: '',
        
    //   };
    //   return (dispatch, state) => {
    //     dispatch({
    //       type: ADD_USER,
    //       users: [...state.Users, newUser],
    //       selectedId: newUser.id,
    //     });
    //   };
    // }
    export function editUser(newUser) {
      return (dispatch, state) => {
        const users = state.Users;
        const newUsers = [];
        users.forEach(user => {
          if (user.id === newUser.id) {
            newUsers.push(newUser);
          } else {
            newUsers.push(user);
          }
        });
        dispatch({
          type: EDIT_USER,
          users: newUsers.sort(ascendingSort),
        });
      }
    }
    
    export function deleteUser(id) {
      return (dispatch, state) => {
        const users = state.Users;
        const selectedId = state.Users.get('selectedId');
        const newUsers = [];
        users.forEach(user => {
          if (user.id === id) {
          } else {
            newUsers.push(user);
          }
        });
        dispatch({
          type: DELETE_USER,
          users: newUsers,
          selectedId: id === selectedId ? undefined : selectedId,
        });
      };
    }

    export function viewChange(view) {
      return {
        type: EDIT_VIEW,
        view
      }
    }

