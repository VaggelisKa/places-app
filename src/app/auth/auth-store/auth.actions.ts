import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';
import { UserCredentials } from '../models/userCredentials.model';

// Login Actions //
export const userLogin = createAction(
    '[Login Page] User Login',
    props<{credentials: UserCredentials}>()
);

export const userLoginSuccess = createAction(
    '[Login Page] User Login Success',
    props<{user: User}>()
);

export const userLoginFail = createAction(
    '[Login Page] User Login Fail',
    props<{error: string}>()
);


// Signup Actions //
export const userSignup = createAction(
    '[Signup Page] User Signup',
    props<{credentials: UserCredentials}>()
);

export const userSignupSuccess = createAction(
    '[Signup Page] User Signup Success',
    props<{newUser: User}>()
);

export const userSignupFail = createAction(
    '[Signup Page] User Signup Fail',
    props<{error: string}>()
);
