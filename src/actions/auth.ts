interface LoginData {
    email: string;
    password: string;
}
  
export interface UserData {
    id: string | undefined;
    email: string | undefined;
    profilePicture: string | null| undefined;
}
  
export type LoginAction =
    | { type: 'LOGIN_REQUEST'; input: LoginData }
    | { type: 'LOGIN_REQUEST_GOOGLE' }
    | { type: 'LOGIN_SUCCESS'; user: UserData }
    | { type: 'LOGIN_FAILED'; error: string }
    | { type: 'LOGOUT_SUCCESS' };

// action creators
export function loginRequest(input: LoginData): LoginAction {
    console.log(`auth action login request`);
    return { type: 'LOGIN_REQUEST', input };
}

export function loginRequestGoogle(): LoginAction {
    console.log(`auth action login request GOOGLE`);
    return { type: 'LOGIN_REQUEST_GOOGLE' };
}

export function loginSuccess(user: UserData): LoginAction {
    console.log(`auth action: login success. User: ${JSON.stringify(user)}`)
    return { type: 'LOGIN_SUCCESS', user};
}
  
export function loginFailed(error: string): LoginAction {
    return { type: 'LOGIN_FAILED', error };
}
  
export function logoutSuccess(): LoginAction {
    return { type: 'LOGOUT_SUCCESS' };
}