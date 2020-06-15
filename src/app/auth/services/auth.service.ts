import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import * as fromAuth from '../auth-store/auth.reducer';
import { Store } from '@ngrx/store';
import { setAuthenticated, setUnauththenticated, isAuthLoading } from '../auth-store/auth.actions';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

interface SignupResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private _store: Store<fromAuth.State>,
                private _router: Router,
                private _http: HttpClient) {}

    private readonly signupEndopoint = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApiKey;

    login(): void {
        this._store.dispatch(setAuthenticated());
        this._store.dispatch(isAuthLoading());
        setTimeout((_) => {
            this._store.dispatch(isAuthLoading());
            this._router.navigate(['/places/tabs/discover']);
        }, 2000);
    }

    signup(userData: User) {
        return this._http
            .post<SignupResponseData>(this.signupEndopoint, userData);
    }

    logout(): void {
        this._store.dispatch(setUnauththenticated());
    }
}
