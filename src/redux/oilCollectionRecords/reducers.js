import { 
	FETCH_ALL_COLLECTION_RECORDS
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
		case FETCH_ALL_COLLECTION_RECORDS: 
			return {	
				...state,			
				fetched: true,
        collections: action.payload.data.allOilCollectionRecords
			};
		default:
			return state;
	}
}