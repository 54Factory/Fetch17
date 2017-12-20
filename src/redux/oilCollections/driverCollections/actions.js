import { client } from "../../../client";
import { OIL_COLLECTIONS_BY_DRIVER_QUERY, COMPLETED_COLLECTIONS_QUERY } from "../../../graphql/queries";
export const FETCH_COLLECTIONS_BY_DRIVER = "FETCH_COLLECTIONS_BY_DRIVER";
export const FETCH_COMPLETED_COLLECTIONS = "FETCH_COMPLETED_COLLECTIONS";
export const CHANGE_COLLECTION = 'CHANGE_COLLECTION';
export const EDIT_VIEW = 'EDIT_VIEW';
export const MAP_VIEW = 'MAP_VIEW';


export function fetchCollectionsByDriver(userId) {
  return client.query({ query: OIL_COLLECTIONS_BY_DRIVER_QUERY, variables: { id: userId } })
    .then((response) => {
      return {
        type: FETCH_COLLECTIONS_BY_DRIVER,
        payload: response  
      };
    })
  }

export function fetchCompletedCollections() {
  return client.query({ query: COMPLETED_COLLECTIONS_QUERY })
    .then((response) => {
      return {
        type: FETCH_COMPLETED_COLLECTIONS,
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