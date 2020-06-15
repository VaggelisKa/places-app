import { createReducer, on, Action } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '../models/user.model';

export interface AuthState {
    newUser: User;
    isAuth: boolean;
    isLoading: boolean;
}

export interface State {
    auth: AuthState;
}

export const initialState: AuthState = {
    newUser: null,
    isAuth: false,
    isLoading: false
};

const authReducer = createReducer(
    initialState,
    on(AuthActions.setAuthenticated, state => ({
        ...state,
        isAuth: true
    })),

    on(AuthActions.setUnauththenticated, state => ({
        ...state,
        isAuth: false
    })),

    on(AuthActions.isAuthLoading, state => ({
        ...state,
        isLoading: !state.isLoading
    })),

    on(AuthActions.userSignup, state => ({
        ...state,
        isLoading: true
    })),

    on(AuthActions.userSignupSuccess, (state, {newUser}) => ({
        ...state,
        newUser: newUser,
        isLoading: false
    }))
);

export const AuthFeatureKey = 'auth';

export const getAuthState = (state: State) => state.auth;

export function reducer(state: AuthState, action: Action) {
    return authReducer(state, action);
}
