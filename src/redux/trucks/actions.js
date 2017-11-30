import { client } from "../../client";
import { ALL_TRUCKS_QUERY } from "../../graphql/queries";
export const FETCH_TRUCKS = "FETCH_TRUCKS";
export const FETCH_TRUCK = "FETCH_TRUCK";
export const CREATE_TRUCK = "CREATE_TRUCK";
export const DELETE_TRUCK = "DELETE_TRUCK";
export const ADD_TRUCK = 'ADD_TRUCK';
export const ADD_TRUCK_REQUEST = 'ADD_TRUCK_REQUEST';
export const ADD_TRUCK_SUCCESS = 'ADD_TRUCK_SUCCESS';
export const ADD_TRUCK_ERROR = 'ADD_TRUCK_ERROR';
export const EDIT_TRUCK = 'EDIT_TRUCK';
export const CHANGE_TRUCK = 'CHANGE_TRUCK';
export const EDIT_VIEW = 'EDIT_VIEW';

function ascendingSort(user1, user2) {
  const name1 = user1.name ? user1.name.toUpperCase() : '~';
  const name2 = user2.name ? user2.name.toUpperCase() : '~';
  return name1 > name2 ? 1 : name1 === name2 ? 0 : -1;
}

export function fetchTrucks() {
  return client.query({ query: ALL_TRUCKS_QUERY })
    .then((response) => {
      return {
        type: FETCH_TRUCKS,
        payload: response  
      };
    })
  }

  export function changeTruck(id) {
    return {
      type: CHANGE_TRUCK,
      id
    }
  }


export const addTruck = ({ name }) => ({
  type: ADD_TRUCK_REQUEST,
  name,
});

export const addUserSuccess = () => ({
  type: ADD_TRUCK_SUCCESS,
  message: 'User created successfully!',
});

export const addUserError = ({ error }) => ({
  type: ADD_TRUCK_ERROR,
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
    export function editTruck(newTruck) {
      return (dispatch, state) => {
        const trucks = state.Trucks;
        const newTrucks = [];
        trucks.forEach(truck => {
          if (truck.id === newTruck.id) {
            newTrucks.push(newTruck);
          } else {
            newTrucks.push(truck);
          }
        });
        dispatch({
          type: EDIT_TRUCK,
          trucks: newTrucks.sort(ascendingSort),
        });
      }
    }
    
    export function deleteTruck(id) {
      return (dispatch, state) => {
        const trucks = state.Trucks;
        const selectedId = state.Trucks.get('selectedId');
        const newTrucks = [];
        trucks.forEach(truck => {
          if (truck.id === id) {
          } else {
            newTrucks.push(truck);
          }
        });
        dispatch({
          type: DELETE_TRUCK,
          trucks: newTrucks,
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