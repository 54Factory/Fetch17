import { client } from "../../client";
import { ALL_COLLECTIONS_QUERY } from "../../graphql/queries";


export const FETCH_ALL_COLLECTIONS = "FETCH_ALL_COLLECTIONS";


export function fetchAllCollectionRecords() {
  return client.query({ query: ALL_COLLECTIONS_QUERY })
    .then((response) => {
      return {
        type: FETCH_ALL_COLLECTIONS,
        payload: response  
      };
    })
  }