import { client } from "../../client";
import { ALL_SERVICES_QUERY } from "../../graphql/queries";
export const FETCH_SERVICES = "FETCH_SERVICES";
export const FETCH_COMPLETED_SERVICES = "FETCH_COMPLETED_SERVICES";
export const FETCH_SERVICE = "FETCH_SERVICE";
export const CREATE_SERVICE = "CREATE_SERVICE";
export const DELETE_SERVICE = "DELETE_SERVICE";
export const ADD_SERVICE = 'ADD_SERVICE';
export const COMPLETE_SERVICE_REQUEST = 'COMPLETE_SERVICE_REQUEST';
export const COMPLETE_SERVICE_SUCCESS = 'COMPLETE_SERVICE_SUCCESS';
export const COMPLETE_SERVICE_ERROR = 'COMPLETE_SERVICE_ERROR';
export const EDIT_SERVICE = 'EDIT_SERVICE';
export const CHANGE_SERVICE = 'CHANGE_SERVICE';
export const EDIT_VIEW = 'EDIT_VIEW';
export const MAP_VIEW = 'MAP_VIEW';


export function fetchServices() {
  return client.query({ query: ALL_SERVICES_QUERY })
    .then((response) => {
      return {
        type: FETCH_SERVICES,
        payload: response  
      };
    })
  }

// export function fetchCompletedSetUps() {
//   return client.query({ query: COMPLETED_SETUPS_QUERY })
//     .then((response) => {
//       return {
//         type: FETCH_COMPLETED_SETUPS,
//         payload: response  
//       };
//     })
//   }

  export function changeService(id) {
    return {
      type: CHANGE_SERVICE,
      id
    }
  }


export const editService = ({ locationName }) => ({
  type: COMPLETE_SERVICE_REQUEST,
  locationName,
});

export const editServiceSuccess = () => ({
  type: COMPLETE_SERVICE_SUCCESS,
  message: 'User created successfully!',
});

export const editServiceError = ({ error }) => ({
  type: COMPLETE_SERVICE_ERROR,
  message: error.message,
});

    
    export function deleteService(id) {
      return (dispatch, state) => {
        const services = state.Services;
        const selectedId = state.Services.get('selectedId');
        const newServices = [];
        services.forEach(service => {
          if (service.id === id) {
          } else {
            newServices.push(service);
          }
        });
        dispatch({
          type: DELETE_SERVICE,
          services: newServices,
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