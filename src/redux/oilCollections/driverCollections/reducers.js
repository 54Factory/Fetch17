import { 
	FETCH_COLLECTIONS_BY_DRIVER,
	FETCH_COMPLETED_COLLECTIONS, 
	CHANGE_COLLECTION,
	EDIT_VIEW,
	MAP_VIEW
} from "./actions";

const initialState = {
	collections: [],
	completedCollections: [],
	fetched: false,
	completedFetched: false,
	selectedId: 'id',
	editView: false,
	loading: false
};

export default function driverCollectionsReducer(state = initialState, action) {
  switch (action.type) {
		case FETCH_COLLECTIONS_BY_DRIVER: 
			return {	
				...state,			
				fetched: true,
				collections: action.payload.data.User
			};
		case FETCH_COMPLETED_COLLECTIONS: 
			return {	
				...state,			
				completedFetched: true,
				completedCollections: action.payload.data.User
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
    case EDIT_VIEW:
      return {
				...state,
				editView: action.view};
		default:
			return state;
	}
}