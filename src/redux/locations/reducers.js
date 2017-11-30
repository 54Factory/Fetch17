import { 
	FETCH_LOCATIONS, 
	CHANGE_LOCATION,
	ADD_LOCATION,
	ADD_LOCATION_REQUEST,
	ADD_LOCATION_SUCCESS,
	EDIT_LOCATION,
	DELETE_LOCATION,
	ADD_LOCATION_ERROR,
	EDIT_VIEW
} from "./actions";

const initialState = {
	locations: [],
	fetching: false,
	fetched: false,
	selectedId: 'id',
	editView: false,
	loading: false,
	locationName: null
};

export default function locationsReducer(state = initialState, action) {
  switch (action.type) {
		case FETCH_LOCATIONS: 
			return {	
				...state,			
				fetched: true,
        locations: action.payload.data.allLocations
			};
		case CHANGE_LOCATION:
      return {
				...state,
				selectedId: action.id,
				editView :false
			};
    case ADD_LOCATION:
      return {
				...state,
        locations: action.locations,
        selectedId: action.selectedId,
				editView: true
			}
		case ADD_LOCATION_REQUEST:
      return {
        ...initialState,
        loading: true,
        locationName: action.locationName,
      };
    case ADD_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: null,
        successMessage: action.payload.message,
      };
    case ADD_LOCATION_ERROR:
      return {
        ...state,
        loading: false,
        successMessage: null,
        errorMessage: action.payload.message,
      };
    case EDIT_LOCATION:
      return {
				...state,
				locations: action.locations
			};
    case DELETE_LOCATION:
      return {
				...state,
        locations: action.locations,
        selectedId: action.selectedId};
    case EDIT_VIEW:
      return {
				...state,
				editView: action.view};
		default:
			return state;
	}
}