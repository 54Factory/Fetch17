import { client } from "../../client";
import { PENDING_SETUPS_QUERY, COMPLETED_SETUPS_QUERY } from "../../graphql/queries";
export const FETCH_SETUPS = "FETCH_SETUPS";
export const FETCH_COMPLETED_SETUPS = "FETCH_COMPLETED_SETUPS";
export const FETCH_SETUP = "FETCH_SETUP";
export const CREATE_SETUP = "CREATE_SETUP";
export const DELETE_SETUP = "DELETE_SETUP";
export const ADD_SETUP = 'ADD_SETUP';
export const COMPLETE_SETUP_REQUEST = 'COMPLETE_SETUP_REQUEST';
export const COMPLETE_SETUP_SUCCESS = 'COMPLETE_SETUP_SUCCESS';
export const COMPLETE_SETUP_ERROR = 'COMPLETE_SETUP_ERROR';
export const EDIT_SETUP = 'EDIT_SETUP';
export const CHANGE_SETUP = 'CHANGE_SETUP';
export const EDIT_VIEW = 'EDIT_VIEW';
export const MAP_VIEW = 'MAP_VIEW';


export function fetchSetUps() {
  return client.query({ query: PENDING_SETUPS_QUERY })
    .then((response) => {
      return {
        type: FETCH_SETUPS,
        payload: response  
      };
    })
  }

export function fetchCompletedSetUps() {
  return client.query({ query: COMPLETED_SETUPS_QUERY })
    .then((response) => {
      return {
        type: FETCH_COMPLETED_SETUPS,
        payload: response  
      };
    })
  }

  export function changeSetUp(id) {
    return {
      type: CHANGE_SETUP,
      id
    }
  }


export const editSetUp = ({ locationName }) => ({
  type: COMPLETE_SETUP_REQUEST,
  locationName,
});

export const editSetUpSuccess = () => ({
  type: COMPLETE_SETUP_SUCCESS,
  message: 'User created successfully!',
});

export const editSetUpError = ({ error }) => ({
  type: COMPLETE_SETUP_ERROR,
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
    // export function editSetUp(newSetUp) {
    //   return (dispatch, state) => {
    //     const setups = state.SetUps;
    //     const newSetUps = [];
    //     setups.forEach(setup => {
    //       if (setup.id === newSetUp.id) {
    //         newSetUps.push(newSetUp);
    //       } else {
    //         newSetUps.push(setup);
    //       }
    //     });
    //     dispatch({
    //       type: EDIT_SETUP,
    //       setups: newSetUps.sort(ascendingSort),
    //     });
    //   }
    // }
    
    export function deleteSetUp(id) {
      return (dispatch, state) => {
        const setups = state.SetUps;
        const selectedId = state.SetUps.get('selectedId');
        const newSetUps = [];
        setups.forEach(setup => {
          if (setup.id === id) {
          } else {
            newSetUps.push(setup);
          }
        });
        dispatch({
          type: DELETE_SETUP,
          setups: newSetUps,
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

    export function viewMap(view) {
      return {
        type: MAP_VIEW,
        view
      }
    }