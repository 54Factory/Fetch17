import { client } from "../../client";
import { PENDING_COLLECTIONS_QUERY, UNASSIGNED_COLLECTIONS_QUERY } from "../../graphql/queries";
export const FETCH_COLLECTIONS = "FETCH_COLLECTIONS";
export const FETCH_UNASSIGNED_COLLECTIONS = "FETCH_UNASSIGNED_COLLECTIONS";
export const FETCH_COLLECTION = "FETCH_COLLECTION";
export const CREATE_COLLECTION = "CREATE_COLLECTION";
export const DELETE_COLLECTION = "DELETE_COLLECTION";
export const ADD_COLLECTION = 'ADD_COLLECTION';
export const COMPLETE_COLLECTION_REQUEST = 'COMPLETE_COLLECTION_REQUEST';
export const COMPLETE_COLLECTION_SUCCESS = 'COMPLETE_COLLECTION_SUCCESS';
export const COMPLETE_COLLECTION_ERROR = 'COMPLETE_COLLECTION_ERROR';
export const EDIT_COLLECTION = 'EDIT_COLLECTION';
export const CHANGE_COLLECTION = 'CHANGE_COLLECTION';
export const EDIT_VIEW = 'EDIT_VIEW';
export const MAP_VIEW = 'MAP_VIEW';


export function fetchCollections() {
  return client.query({ query: PENDING_COLLECTIONS_QUERY })
    .then((response) => {
      return {
        type: FETCH_COLLECTIONS,
        payload: response  
      };
    })
  }

export function fetchUnassignedCollections() {
  return client.query({ query: UNASSIGNED_COLLECTIONS_QUERY })
    .then((response) => {
      return {
        type: FETCH_UNASSIGNED_COLLECTIONS,
        payload: response  
      };
    })
  }

  export function changeCollection(id) {
    return {
      type: CHANGE_COLLECTION,
      id
    }
  }


export const editCollection = ({ locationName }) => ({
  type: COMPLETE_COLLECTION_REQUEST,
  locationName,
});

export const editCollectionSuccess = () => ({
  type: COMPLETE_COLLECTION_SUCCESS,
  message: 'User created successfully!',
});

export const editCollectionError = ({ error }) => ({
  type: COMPLETE_COLLECTION_ERROR,
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
    //     const newCollections = [];
    //     setups.forEach(setup => {
    //       if (setup.id === newSetUp.id) {
    //         newCollections.push(newSetUp);
    //       } else {
    //         newCollections.push(setup);
    //       }
    //     });
    //     dispatch({
    //       type: EDIT_SETUP,
    //       setups: newCollections.sort(ascendingSort),
    //     });
    //   }
    // }
    
    export function deleteCollection(id) {
      return (dispatch, state) => {
        const setups = state.SetUps;
        const selectedId = state.SetUps.get('selectedId');
        const newCollections = [];
        setups.forEach(setup => {
          if (setup.id === id) {
          } else {
            newCollections.push(setup);
          }
        });
        dispatch({
          type: DELETE_COLLECTION,
          setups: newCollections,
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