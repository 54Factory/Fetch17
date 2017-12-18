import { client } from "../../../client";
import { SET_UP_TRUCK_QUERY } from "../../../graphql/queries";

export const FETCH_SET_UP_TRUCK = "FETCH_SET_UP_TRUCK";


export function fetchSetUpTruck() {
  return client.query({ query: SET_UP_TRUCK_QUERY })
    .then((response) => {
      return {
        type: FETCH_SET_UP_TRUCK,
        payload: response  
      };
    })
  }