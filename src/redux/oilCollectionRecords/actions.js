import { client } from "../../client";
import { ALL_COLLECTION_RECORDS_QUERY } from "../../graphql/queries";


export const FETCH_ALL_COLLECTION_RECORDS = "FETCH_ALL_COLLECTION_RECORDS";


export function fetchAllCollectionRecords() {
  return client.query({ query: ALL_COLLECTION_RECORDS_QUERY })
    .then((response) => {
      return {
        type: FETCH_ALL_COLLECTION_RECORDS,
        payload: response  
      };
    })
  }