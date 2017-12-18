import { client } from "../../client";
import { USER_QUERY_FOR_SIDEBAR } from "../../graphql/queries";
//import { contacts } from './reducer';
export const FETCH_USER_FOR_SIDEBAR = "FETCH_USER_FOR_SIDEBAR";


export function fetchUserForSidebar(userId) {
  return client.query({ query: USER_QUERY_FOR_SIDEBAR, variables: { id: userId }, })
    .then((response) => {
      return {
        type: FETCH_USER_FOR_SIDEBAR,
        payload: response  
      };
    })
  }