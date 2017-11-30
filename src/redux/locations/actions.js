import { client } from "../../client";
import { ALL_LOCATIONS_QUERY } from "../../graphql/queries";
export const FETCH_LOCATIONS = "FETCH_LOCATIONS";
export const FETCH_LOCATION = "FETCH_LOCATION";
export const CREATE_LOCATION = "CREATE_LOCATION";
export const DELETE_LOCATION = "DELETE_LOCATION";
export const ADD_LOCATION = 'ADD_LOCATION';
export const ADD_LOCATION_REQUEST = 'ADD_LOCATION_REQUEST';
export const ADD_LOCATION_SUCCESS = 'ADD_LOCATION_SUCCESS';
export const ADD_LOCATION_ERROR = 'ADD_LOCATION_ERROR';
export const EDIT_LOCATION = 'EDIT_LOCATION';
export const CHANGE_LOCATION = 'CHANGE_LOCATION';
export const EDIT_VIEW = 'EDIT_VIEW';

function ascendingSort(user1, user2) {
  const name1 = user1.locationName ? user1.locationName.toUpperCase() : '~';
  const name2 = user2.locationName ? user2.locationName.toUpperCase() : '~';
  return name1 > name2 ? 1 : name1 === name2 ? 0 : -1;
}

export function fetchLocations() {
  return client.query({ query: ALL_LOCATIONS_QUERY })
    .then((response) => {
      return {
        type: FETCH_LOCATIONS,
        payload: response  
      };
    })
  }

  export function changeLocation(id) {
    return {
      type: CHANGE_LOCATION,
      id
    }
  }


export const addLocation = ({ locationName }) => ({
  type: ADD_LOCATION_REQUEST,
  locationName,
});

export const addUserSuccess = () => ({
  type: ADD_LOCATION_SUCCESS,
  message: 'User created successfully!',
});

export const addUserError = ({ error }) => ({
  type: ADD_LOCATION_ERROR,
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
    export function editLocation(newLocation) {
      return (dispatch, state) => {
        const locations = state.Locations;
        const newLocations = [];
        locations.forEach(location => {
          if (location.id === newLocation.id) {
            newLocations.push(newLocation);
          } else {
            newLocations.push(location);
          }
        });
        dispatch({
          type: EDIT_LOCATION,
          locations: newLocations.sort(ascendingSort),
        });
      }
    }
    
    export function deleteLocation(id) {
      return (dispatch, state) => {
        const locations = state.Locations;
        const selectedId = state.Locations.get('selectedId');
        const newLocations = [];
        locations.forEach(location => {
          if (location.id === id) {
          } else {
            newLocations.push(location);
          }
        });
        dispatch({
          type: DELETE_LOCATION,
          locations: newLocations,
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