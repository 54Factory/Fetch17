import { 
	FETCH_SERVICES,
	FETCH_COMPLETED_SERVICES, 
	CHANGE_SERVICE,
	ADD_SERVICE,
	COMPLETE_SERVICE_REQUEST,
	COMPLETE_SERVICE_SUCCESS,
	EDIT_SERVICE,
	DELETE_SERVICE,
	COMPLETE_SERVICE_ERROR,
	EDIT_VIEW,
	MAP_VIEW
} from "./actions";

const initialState = {
	services: [],
	fetching: false,
	fetched: false,
	selectedId: 'id',
	editView: false,
	loading: false
};

export default function servicesReducer(state = initialState, action) {
  switch (action.type) {
		case FETCH_SERVICES: 
			return {	
				...state,			
				fetched: true,
				services: action.payload.data.allServices
			};
		case FETCH_COMPLETED_SERVICES: 
			return {	
				...state,			
				fetched: true,
				services: action.payload.data.allServices
			};	
		case CHANGE_SERVICE:
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
    case ADD_SERVICE:
      return {
				...state,
        services: action.services,
        selectedId: action.selectedId,
				editView: true
			}
		case COMPLETE_SERVICE_REQUEST:
      return {
        ...initialState,
        loading: true,
        locationName: action.locationName,
      };
    case COMPLETE_SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: null,
        successMessage: action.payload.message,
      };
    case COMPLETE_SERVICE_ERROR:
      return {
        ...state,
        loading: false,
        successMessage: null,
        errorMessage: action.payload.message,
      };
    case EDIT_SERVICE:
      return {
				...state,
				services: action.services
			};
    case DELETE_SERVICE:
      return {
				...state,
        services: action.services,
        selectedId: action.selectedId};
    case EDIT_VIEW:
      return {
				...state,
				editView: action.view};
		default:
			return state;
	}
}