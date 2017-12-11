import { client } from "../../client";
import { ALL_DRIVERS_QUERY, ALL_USERS_DRIVERS_QUERY } from "../../graphql/queries";
export const FETCH_DRIVERS = "FETCH_DRIVERS";
export const FETCH_USERS_DRIVERS = "FETCH_USERS_DRIVERS";
export const CHANGE_DRIVER = 'CHANGE_DRIVER';
export const EDIT_VIEW = 'EDIT_VIEW';
export const MAIN_VIEW = 'MAIN_VIEW';
export const NEW_DRIVER_VIEW = 'NEW_DRIVER_VIEW';


export function fetchDrivers() {
  return client.query({ query: ALL_DRIVERS_QUERY })
    .then((response) => {
      return {
        type: FETCH_DRIVERS,
        payload: response  
      };
    })
  }

  export function fetchDriverUser() {
    return client.query({ query: ALL_USERS_DRIVERS_QUERY })
      .then((response) => {
        return {
          type: FETCH_USERS_DRIVERS,
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

  export function viewAddDriver(view) {
    return {
      type: NEW_DRIVER_VIEW,
      view
    }
  }

