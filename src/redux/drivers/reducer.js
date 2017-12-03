import { 
	FETCH_DRIVERS, 
	CHANGE_DRIVER,
	ADD_DRIVER,
	ADD_DRIVER_REQUEST,
	ADD_DRIVER_SUCCESS,
	EDIT_DRIVER,
	DELETE_DRIVER,
	ADD_DRIVER_ERROR,
	EDIT_VIEW,
	MAIN_VIEW
} from "./actions";

const initialState = {
	drivers: [],
	fetching: false,
	fetched: false,
	selectedId: 'id',
	editView: false,
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
    case ADD_DRIVER:
      return {
				...state,
        drivers: action.drivers,
        selectedId: action.selectedId,
				editView: true
			}
		case ADD_DRIVER_REQUEST:
      return {
        ...initialState,
        loading: true,
        username: action.username,
      };
    case ADD_DRIVER_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: null,
        successMessage: action.payload.message,
      };
    case ADD_DRIVER_ERROR:
      return {
        ...state,
        loading: false,
        successMessage: null,
        errorMessage: action.payload.message,
      };
    case EDIT_DRIVER:
      return {
				...state,
				drivers: action.drivers
			};
    case DELETE_DRIVER:
      return {
				...state,
        drivers: action.drivers,
        selectedId: action.selectedId};
    case EDIT_VIEW:
      return {
				...state,
				editView: action.view};
		default:
			return state;
	}
}
