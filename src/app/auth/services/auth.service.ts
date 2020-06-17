import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

import * as fromAuth from '../auth-store/auth.reducer';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.model';
import { UserCredentials } from '../models/userCredentials.model';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

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

    login(userData: UserCredentials): Observable<User> {
        return this._http
            .post<AuthResponseData>(this.signinEndpoint, userData)
            .pipe(
                map(response => {
                    const expirationDate = moment().add(+response.expiresIn, 'seconds').toDate();
                    const user: User = {
                        id: response.localId,
                        email: response.email,
                        token: response.idToken,
                        tokenExpirationDate: expirationDate
                    };
                    return user;
                },
                catchError((error: HttpErrorResponse) => throwError(error))
            ));
    }

    signup(userData: UserCredentials): Observable<User> {
        return this._http
            .post<AuthResponseData>(this.signupEndopoint, userData)
            .pipe(map(response => {
                const expirationDate = moment().add(+response.expiresIn, 'seconds').toDate();
                const user: User = {
                    id: response.localId,
                    email: response.email,
                    token: response.idToken,
                    tokenExpirationDate: expirationDate
                };
                return user;
            }));
    }

    logout(): void {

    }
}
