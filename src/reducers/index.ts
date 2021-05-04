import {combineReducers} from 'redux';
import postReducer from './postReducer';
import {loginReducer} from './authReducer';

const rootReducer = combineReducers({
  postReducer: postReducer,
  loginReducer: loginReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>
