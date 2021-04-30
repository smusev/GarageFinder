import {ADD_POST} from '../actions/actionTypes';
import {PostTypes} from '../actions/post.d';

// Initial State
const initialState = {
  counter: 0,
  posts: [],
};
// Reducers (Modifies The State And Returns A New State)
const postReducer = (state = initialState, action: PostTypes) => {
  switch (action.type) {
    case ADD_POST: {
      console.log('reducer state: ' + state);
      console.log('reducer add: ' + action.payload);
      return {
        // State
        ...state,
        // Redux Store
        devices: action.payload,
      };
    }

    // Testing purposes:
    // Increase Counter
    case 'INCREASE_COUNTER': {
      return {
        // State
        ...state,
        // Redux Store
        counter: state.counter + 1,
      };
    }
    // Decrease Counter
    case 'DECREASE_COUNTER': {
      return {
        // State
        ...state,
        // Redux Store
        counter: state.counter - 1,
      };
    }
    // Default
    default: {
      return state;
    }
  }
};
// Exports
export default postReducer;
