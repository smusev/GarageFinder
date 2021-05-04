import { LoginAction, UserData } from '../actions/auth';

interface LoginState {
  user: UserData;
  isLoading: boolean;
  error: string;
  trueFalse: boolean;
}

const initialState: LoginState = {
  user: null,
  error: null,
  isLoading: false,
  trueFalse: false,
}

export function loginReducer(state = initialState, action: LoginAction): LoginState {
  switch (action.type) {
    case 'LOGIN_REQUEST': 
      return {...state, isLoading: true}
    case 'LOGIN_SUCCESS':
      return {...state, isLoading: false, user: action.user}
    case 'LOGIN_FAILED':
      return {...state, isLoading: false, error: action.error}
    case 'LOGIN':
        return {...state, isLoading: false, trueFalse: action.trueFalse}
    default:
      return state;
  }
}