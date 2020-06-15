import { createReducer, on, Action } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '../models/user.model';

export interface AuthState {
    user: User;
    newUser: User;
    isAuth: boolean;
    isLoading: boolean;
}

export interface State {
    auth: AuthState;
}

export const initialState: AuthState = {
    user: null,
    newUser: null,
    isAuth: false,
    isLoading: false
};

const authReducer = createReducer(
    initialState,
    on(AuthActions.userSignup, state => ({
        ...state,
        isLoading: true
    })),

    on(AuthActions.userSignupSuccess, (state, {newUser}) => ({
        ...state,
        newUser: newUser,
        isLoading: false
    })),

    on(AuthActions.userLogin, state => ({
        ...state,
        isLoading: true
    })),

    on(AuthActions.userLoginSuccess, (state, {user}) => ({
        ...state,
        user: user,
        isLoading: false,
        isAuth: true
    }))
);

export const AuthFeatureKey = 'auth';

export const getAuthState = (state: State) => state.auth;

export function reducer(state: AuthState, action: Action) {
    return authReducer(state, action);
}
