import { 
	FETCH_USER_FOR_SIDEBAR
} from "./actions";

const initialState = {
	truckType: null,
	fetched: false,
};

export default function sidebarReducer(state = initialState, action) {
  switch (action.type) {
		case FETCH_USER_FOR_SIDEBAR: 
			return {	
				...state,			
				fetched: true,
        truckType: action.payload.data.User.driver.truck.type
			};
		default:
			return state;
	}
}