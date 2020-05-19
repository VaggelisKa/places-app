import { Injectable } from '@angular/core';

import * as fromAuth from '../auth-store/auth.reducer';
import { Store } from '@ngrx/store';
import { setAuthenticated, setUnauththenticated, isAuthLoading } from '../auth-store/auth.actions';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private _store: Store<fromAuth.State>,
                private _router: Router) {}

    login(): void {
        this._store.dispatch(setAuthenticated());
        this._store.dispatch(isAuthLoading());
        setTimeout((_) => {
            this._store.dispatch(isAuthLoading());
            this._router.navigate(['/places/tabs/discover']);
        }, 2000);
    }

    signup(): void {
        this._store.dispatch(setAuthenticated());
        this._store.dispatch(isAuthLoading());
        setTimeout((_) => {
            this._store.dispatch(isAuthLoading());
            this._router.navigate(['/places/tabs/discover']);
        }, 2000);
    }

    logout(): void {
        this._store.dispatch(setUnauththenticated());
    }
}
