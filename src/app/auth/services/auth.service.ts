import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

import * as fromAuth from '../auth-store/auth.reducer';
import { Store } from '@ngrx/store';
import * as authActions from '../auth-store/auth.actions';

import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.model';
import { UserCredentials } from '../models/userCredentials.model';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject, from } from 'rxjs';

import { Plugins } from '@capacitor/core';

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
    private _userId = new BehaviorSubject<string>(null);

    getUserId(): Observable<string> {
        return this._userId.asObservable();
    }

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
                }),
                tap(user => {
                    if (user) {
                        this._userId.next(user.id);
                        this.storeAuthData(user.id, user.token, user.tokenExpirationDate.toISOString(), user.email);
                    }
                }),
                catchError((error: HttpErrorResponse) => throwError(this.errorMesage(error.error.error.message)))
            );
    }

    autoLogin(): Observable<any> {
        return from(Plugins.Storage.get({key: 'authData'}))
            .pipe(
                map(storedData => {
                    if (!storedData || !storedData.value) {
                        return null;
                    }
                    const parsedData = JSON.parse(storedData.value) as { 
                        userId: string;
                        token: string;
                        tokenExpirationDate: string;
                        email: string
                    };

                    const expirationTime = new Date(parsedData.tokenExpirationDate);
                    if (expirationTime <= new Date()) {
                        return null;
                    }

                    const user: User = {
                        id: parsedData.userId,
                        token: parsedData.token,
                        tokenExpirationDate: expirationTime,
                        email: parsedData.email
                    };
                    return user;
                }),
                map(user => {
                    return !!user;
                })
            );
    }

    signup(userData: UserCredentials): Observable<User> {
        return this._http
            .post<AuthResponseData>(this.signupEndopoint, userData)
            .pipe(
                tap(user => {
                    this._userId.next(user.localId);
                }),
                map(response => {
                    const expirationDate = moment().add(+response.expiresIn, 'seconds').toDate();
                    const user: User = {
                        id: response.localId,
                        email: response.email,
                        token: response.idToken,
                        tokenExpirationDate: expirationDate
                    };
                    return user;
                }),
                catchError((error: HttpErrorResponse) => throwError(this.errorMesage(error.error.error.message)))
            );
    }

    private errorMesage(error: string): string {
        switch (error) {
            // Signup Errors //
            case 'EMAIL_EXISTS':
                return 'The email address is already in use by another account';
            case 'OPERATION_NOT_ALLOWED':
                return 'Password sign-in is disabled for this project';
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                return 'We have blocked all requests from this device due to unusual activity';

            // Signin Errors //
            case 'EMAIL_NOT_FOUND':
                return 'There is no user record corresponding to this identifier';
            case 'INVALID_PASSWORD':
                return 'The password is invalid or the user does not have a password';
            case 'USER_DISABLED':
                return 'The user account has been disabled by an administrator';

            default: {
                return 'An unknown error occured';
            }
        }
    }

    logout(): void {
        this._store.dispatch(authActions.logout());
    }

    private storeAuthData(userId: string, token: string, tokenExpirationDate: string, email: string): void {
        const data = JSON.stringify({
            userId: userId,
            token: token,
            tokenExpirationDate: tokenExpirationDate
        });
        Plugins.Storage.set({key: 'authData', value: data});
    }
}
