import { createReducer, on, Action } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
    isAuth: boolean;
    isLoading: boolean;
}

export interface State {
    auth: AuthState;
}

export const initialState: AuthState = {
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

    on(AuthActions.isLoading, state => ({
        ...state,
        isLoading: true
    }))
);

export const AuthFeatureKey = 'auth';

export const getAuthState = (state: State) => state.auth;

export function reducer(state: AuthState, action: Action) {
    return authReducer(state, action);
}
