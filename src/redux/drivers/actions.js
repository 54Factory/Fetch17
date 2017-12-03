import { client } from "../../client";
import { ALL_DRIVERS_QUERY } from "../../graphql/queries";
export const FETCH_DRIVERS = "FETCH_DRIVERS";
export const FETCH_DRIVER = "FETCH_DRIVER";
export const CREATE_DRIVER = "CREATE_DRIVER";
export const DELETE_DRIVER = "DELETE_DRIVER";
export const ADD_DRIVER = 'ADD_DRIVER';
export const ADD_DRIVER_REQUEST = 'ADD_DRIVER_REQUEST';
export const ADD_DRIVER_SUCCESS = 'ADD_DRIVER_SUCCESS';
export const ADD_DRIVER_ERROR = 'ADD_DRIVER_ERROR';
export const EDIT_DRIVER = 'EDIT_DRIVER';
export const CHANGE_DRIVER = 'CHANGE_DRIVER';
export const EDIT_VIEW = 'EDIT_VIEW';
export const MAIN_VIEW = 'MAIN_VIEW';

function ascendingSort(user1, user2) {
  const name1 = user1.firstName ? user1.lastName.toUpperCase() : '~';
  const name2 = user2.firstName ? user2.lastName.toUpperCase() : '~';
  return name1 > name2 ? 1 : name1 === name2 ? 0 : -1;
}

export function fetchDrivers() {
  return client.query({ query: ALL_DRIVERS_QUERY })
    .then((response) => {
      return {
        type: FETCH_DRIVERS,
        payload: response  
      };
    })
  }

  export function changeDriver(id) {
    return {
      type: CHANGE_DRIVER,
      id
    }
  }


export const addDriver = ({ username }) => ({
  type: ADD_DRIVER_REQUEST,
  username,
});

export const addDriverSuccess = () => ({
  type: ADD_DRIVER_SUCCESS,
  message: 'User created successfully!',
});

export const addDriverError = ({ error }) => ({
  type: ADD_DRIVER_ERROR,
  message: error.message,
});

    export function editDriver(newDriver) {
      return (dispatch, state) => {
        const drivers = state.Drivers;
        const newDrivers = [];
        drivers.forEach(driver => {
          if (driver.id === newDriver.id) {
            newDrivers.push(newDriver);
          } else {
            newDrivers.push(driver);
          }
        });
        dispatch({
          type: EDIT_DRIVER,
          drivers: newDrivers.sort(ascendingSort),
        });
      }
    }
    
    export function deleteDriver(id) {
      return (dispatch, state) => {
        const drivers = state.Drivers;
        const selectedId = state.Drivers.get('selectedId');
        const newDrivers = [];
        drivers.forEach(driver => {
          if (driver.id === id) {
          } else {
            newDrivers.push(driver);
          }
        });
        dispatch({
          type: DELETE_DRIVER,
          drivers: newDrivers,
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

    export function viewMainPanel(view) {
      return {
        type: MAIN_VIEW,
        view
      }
    }

