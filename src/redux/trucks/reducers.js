import { 
	FETCH_TRUCKS, 
	CHANGE_TRUCK,
	ADD_TRUCK,
	ADD_TRUCK_REQUEST,
	ADD_TRUCK_SUCCESS,
	EDIT_TRUCK,
	DELETE_TRUCK,
	ADD_TRUCK_ERROR,
	EDIT_VIEW
} from "./actions";

const initialState = {
	trucks: [],
	fetching: false,
	fetched: false,
	selectedId: 'id',
	editView: false,
	loading: false,
	username: null
};

export default function trucksReducer(state = initialState, action) {
  switch (action.type) {
		case FETCH_TRUCKS: 
			return {	
				...state,			
				fetched: true,
        trucks: action.payload.data.allTrucks
			};
		case CHANGE_TRUCK:
      return {
				...state,
				selectedId: action.id,
				editView :false
			};
    case ADD_TRUCK:
      return {
				...state,
        trucks: action.trucks,
        selectedId: action.selectedId,
				editView: true
			}
		case ADD_TRUCK_REQUEST:
      return {
        ...initialState,
        loading: true,
        username: action.username,
      };
    case ADD_TRUCK_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: null,
        successMessage: action.payload.message,
      };
    case ADD_TRUCK_ERROR:
      return {
        ...state,
        loading: false,
        successMessage: null,
        errorMessage: action.payload.message,
      };
    case EDIT_TRUCK:
      return {
				...state,
				trucks: action.trucks
			};
    case DELETE_TRUCK:
      return {
				...state,
        trucks: action.trucks,
        selectedId: action.selectedId};
    case EDIT_VIEW:
      return {
				...state,
				editView: action.view};
		default:
			return state;
	}
}