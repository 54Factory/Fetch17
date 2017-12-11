import { 
	FETCH_DRIVERS,
	FETCH_USERS_DRIVERS, 
	CHANGE_DRIVER,
	EDIT_VIEW,
	MAIN_VIEW,
	NEW_DRIVER_VIEW
} from "./actions";

const initialState = {
	drivers: [],
	users: [],
	fetching: false,
	fetched: false,
	userFetched: false,
	selectedId: 'id',
	editView: false,
	newDriverView: false,
	loading: false,
	username: null
};

export default function driversReducer(state = initialState, action) {
  switch (action.type) {
		case FETCH_DRIVERS: 
			return {	
				...state,			
				fetched: true,
        drivers: action.payload.data.allDrivers
			};
		case FETCH_USERS_DRIVERS: 
			return {	
				...state,			
				userFetched: true,
        users: action.payload.data.allUsers
			};
		case CHANGE_DRIVER:
      return {
				...state,
				selectedId: action.id,
				editView :false
			};
		case MAIN_VIEW:
      return {
				...state,
				selectedId: action.id,
				editView: action.view
			};
		case NEW_DRIVER_VIEW:
      return {
				...state,
				newDriverView: action.view,
				selectedId: action.id,
				editView: false,
			};
    case EDIT_VIEW:
      return {
				...state,
				editView: action.view};
		default:
			return state;
	}
}
