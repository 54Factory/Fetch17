import { 
	FETCH_COLLECTIONS,
	FETCH_UNASSIGNED_COLLECTIONS, 
	CHANGE_COLLECTION,
	ADD_COLLECTION,
	COMPLETE_COLLECTION_REQUEST,
	COMPLETE_COLLECTION_SUCCESS,
	EDIT_COLLECTION,
	DELETE_COLLECTION,
	COMPLETE_COLLECTION_ERROR,
	EDIT_VIEW,
	MAP_VIEW
} from "./actions";

const initialState = {
	collections: [],
	unassignedCollections: [],
	fetching: false,
	fetched: false,
	unassignedFetched: false,
	selectedId: 'id',
	editView: false,
	loading: false
};

export default function collectionsReducer(state = initialState, action) {
  switch (action.type) {
		case FETCH_COLLECTIONS: 
			return {	
				...state,			
				fetched: true,
				collections: action.payload.data.allOilCollectionServices
			};
		case FETCH_UNASSIGNED_COLLECTIONS: 
			return {	
				...state,			
				unassignedFetched: true,
				unassignedCollections: action.payload.data.allOilCollectionStates
			};	
		case CHANGE_COLLECTION:
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
    case ADD_COLLECTION:
      return {
				...state,
        collections: action.collections,
        selectedId: action.selectedId,
				editView: true
			}
		case COMPLETE_COLLECTION_REQUEST:
      return {
        ...initialState,
        loading: true,
        locationName: action.locationName,
      };
    case COMPLETE_COLLECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: null,
        successMessage: action.payload.message,
      };
    case COMPLETE_COLLECTION_ERROR:
      return {
        ...state,
        loading: false,
        successMessage: null,
        errorMessage: action.payload.message,
      };
    case EDIT_COLLECTION:
      return {
				...state,
				collections: action.collections,
				unassignedCollections: action.collections
			};
    case DELETE_COLLECTION:
      return {
				...state,
        collections: action.collections,
        selectedId: action.selectedId};
    case EDIT_VIEW:
      return {
				...state,
				editView: action.view};
		default:
			return state;
	}
}