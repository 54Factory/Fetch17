import { 
	FETCH_ALL_COLLECTIONS
} from "./actions";

const initialState = {
	collections: [],
	fetching: false,
	fetched: false,
	selectedId: 'id',
	editView: false,
	loading: false
};

export default function collectionsReducer(state = initialState, action) {
  switch (action.type) {
		case FETCH_ALL_COLLECTIONS: 
			return {	
				...state,			
				fetched: true,
        collections: action.payload.data.allOilCollectionRecords
			};
		default:
			return state;
	}
}