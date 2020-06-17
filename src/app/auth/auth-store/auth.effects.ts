import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

import * as authActions from './auth.actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions,
                private _authService: AuthService) {}

    createUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.userSignup),
            map(action => action.credentials),
            mergeMap(user => this._authService.signup(user)
                .pipe(
                    map(res => authActions.userSignupSuccess({newUser: {
                        id: res.id,
                        email: res.email,
                        token: res.token,
                        tokenExpirationDate: res.tokenExpirationDate
                    }}))
                )
            )
        )
    );

    loginUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.userLogin),
            map(action => action.credentials),
            mergeMap(credentials => this._authService.login(credentials)
                .pipe(
                    map(res => authActions.userLoginSuccess({user: {
                        id: res.id,
                        email: res.email,
                        token: res.token,
                        tokenExpirationDate: res.tokenExpirationDate
                    }})),
                    catchError(err => of(authActions.userLoginFail({error: err})))
                )
            )
        )
    );
}
