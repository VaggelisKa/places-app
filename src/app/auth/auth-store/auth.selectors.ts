import * as fromAuth from './auth.reducer';
import { createSelector } from '@ngrx/store';


export const getIsAuth = createSelector(
    fromAuth.getAuthState,
    (state: fromAuth.AuthState) => state.isAuth
);

export const authLoading = createSelector(
    fromAuth.getAuthState,
    (state: fromAuth.AuthState) => state.isLoading
);

