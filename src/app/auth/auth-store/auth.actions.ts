import { createAction } from '@ngrx/store';

export const setAuthenticated = createAction('[Auth Log State] Set Authenticated');
export const setUnauththenticated = createAction('[Auth Log State] Set Unauthenticated');
export const isAuthLoading = createAction ('[Auth Loading State] Is Auth Loading');
