import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

import * as authActions from './auth.actions';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions,
                private _authService: AuthService) {}

    createUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.userSignup),
            map(action => action.newUser),
            mergeMap(user => this._authService.signup(user)
                .pipe(
                    map(res => authActions.userSignupSuccess({newUser: {...user, id: res.localId}}))
                )
            )
        )
    );

    loginUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.userLogin),
            map(action => action.user),
            mergeMap(user => this._authService.login(user)
                .pipe(
                    map(res => authActions.userLoginSuccess({user: {...user, id: res.localId}}))
                )
            )
        )
    );
}
