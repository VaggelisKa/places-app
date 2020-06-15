import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import * as fromAuth from '../auth-store/auth.reducer';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private _store: Store<fromAuth.State>,
                private _router: Router,
                private _http: HttpClient) {}

    private readonly signupEndopoint = environment.signupEndpoint + environment.firebaseApiKey;
    private readonly signinEndpoint = environment.signinEndpoint + environment.firebaseApiKey;

    login(userData: User) {
        return this._http
            .post<AuthResponseData>(this.signinEndpoint, userData);
    }

    signup(userData: User) {
        return this._http
            .post<AuthResponseData>(this.signupEndopoint, userData);
    }

    logout(): void {

    }
}
