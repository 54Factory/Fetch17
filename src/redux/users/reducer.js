import { 
	FETCH_USERS, 
	CHANGE_USER,
	ADD_USER,
	ADD_USER_REQUEST,
	ADD_USER_SUCCESS,
	EDIT_USER,
	DELETE_USER,
	ADD_USER_ERROR,
	EDIT_VIEW
} from "./actions";

const initialState = {
	users: [],
	fetching: false,
	fetched: false,
	selectedId: 'id',
	editView: false,
	loading: false,
	username: null
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
		case FETCH_USERS: 
			return {	
				...state,			
				fetched: true,
        users: action.payload.data.allUsers
			};
		case CHANGE_USER:
      return {
				...state,
				selectedId: action.id,
				editView :false
			};
    case ADD_USER:
      return {
				...state,
        users: action.users,
        selectedId: action.selectedId,
				editView: true
			}
		case ADD_USER_REQUEST:
      return {
        ...initialState,
        loading: true,
        username: action.username,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: null,
        successMessage: action.payload.message,
      };
    case ADD_USER_ERROR:
      return {
        ...state,
        loading: false,
        successMessage: null,
        errorMessage: action.payload.message,
      };
    case EDIT_USER:
      return {
				...state,
				users: action.users
			};
    case DELETE_USER:
      return {
				...state,
        users: action.users,
        selectedId: action.selectedId};
    case EDIT_VIEW:
      return {
				...state,
				editView: action.view};
		default:
			return state;
	}
}

// import { Map } from "immutable";
// import fakeData from "../../containers/Contacts/fakeData";
// import contactActions from "./actions";

// const contacts = new fakeData(10).getAll();

// const initState = new Map({
//   contacts,
//   seectedId: contacts[0].id,
//   editView: false
// });

// export default function contactReducer(state = initState, action) {
//   switch (action.type) {

//     default:
//       return state;
//   }
// }

// export { contacts };
