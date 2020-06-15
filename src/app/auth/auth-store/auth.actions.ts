import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

// Login Actions //
export const userLogin = createAction(
    '[Login Page] User Login',
    props<{user: User}>()
);

export const userLoginSuccess = createAction(
    '[Login Page] User Login Success',
    props<{user: User}>()
);


// Signup Actions //
export const userSignup = createAction(
    '[Signup Page] User Signup',
    props<{newUser: User}>()
);

export const userSignupSuccess = createAction(
    '[Signup Page] User Signup Success',
    props<{newUser: User}>()
);
