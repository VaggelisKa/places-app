import { createAction } from '@ngrx/store';

export const setAuthenticated = createAction('[Auth Log State] Set Authenticated');
export const setUnauththenticated = createAction('[Auth Log State] Set Unauthenticated');
export const isLoading = createAction ('[Auth Loading State] Is Loading');
