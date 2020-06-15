import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const setAuthenticated = createAction('[Auth Log State] Set Authenticated');
export const setUnauththenticated = createAction('[Auth Log State] Set Unauthenticated');
export const isAuthLoading = createAction ('[Auth Loading State] Is Auth Loading');

export const userSignup = createAction(
    '[Signup Page] User Signup',
    props<{user: User}>()
);

export const userSignupSuccess = createAction(
    '[Signup Page] User Signup Success',
    props<{user: User}>()
);
