import { 
	FETCH_SETUPS, 
	CHANGE_SETUP,
	ADD_SETUP,
	ADD_SETUP_REQUEST,
	ADD_SETUP_SUCCESS,
	EDIT_SETUP,
	DELETE_SETUP,
	ADD_SETUP_ERROR,
	EDIT_VIEW,
	MAP_VIEW
} from "./actions";

const initialState = {
	setups: [],
	fetching: false,
	fetched: false,
	selectedId: 'id',
	editView: false,
	loading: false
};

export default function setupsReducer(state = initialState, action) {
  switch (action.type) {
		case FETCH_SETUPS: 
			return {	
				...state,			
				fetched: true,
				setups: action.payload.data.allOilCollectionStates
			};
		case CHANGE_SETUP:
      return {
				...state,
				selectedId: action.id,
				editView :false
			};
		case MAP_VIEW:
      return {
				...state,
				selectedId: action.id,
				editView: action.view
			};
    case ADD_SETUP:
      return {
				...state,
        setups: action.setups,
        selectedId: action.selectedId,
				editView: true
			}
		case ADD_SETUP_REQUEST:
      return {
        ...initialState,
        loading: true,
        locationName: action.locationName,
      };
    case ADD_SETUP_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: null,
        successMessage: action.payload.message,
      };
    case ADD_SETUP_ERROR:
      return {
        ...state,
        loading: false,
        successMessage: null,
        errorMessage: action.payload.message,
      };
    case EDIT_SETUP:
      return {
				...state,
				setups: action.setups
			};
    case DELETE_SETUP:
      return {
				...state,
        setups: action.setups,
        selectedId: action.selectedId};
    case EDIT_VIEW:
      return {
				...state,
				editView: action.view};
		default:
			return state;
	}
}