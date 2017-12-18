import { 
	FETCH_SET_UP_TRUCK
} from "./actions";

const initialState = {
  setUpTrucks: [],
  fetched: false
};

export default function setUpTruckReducer(state = initialState, action) {
  switch (action.type) {
		case FETCH_SET_UP_TRUCK: 
			return {	
				...state,			
				fetched: true,
        setUpTrucks: action.payload.data.allSetUpTrucks
			};
		default:
			return state;
	}
}