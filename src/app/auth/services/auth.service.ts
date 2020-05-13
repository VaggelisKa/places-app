import { Injectable } from '@angular/core';

import * as fromAuth from '../auth-store/auth.reducer';
import { Store } from '@ngrx/store';
import { setAuthenticated, setUnauththenticated } from '../auth-store/auth.actions';

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private _store: Store<fromAuth.State>) {}

    private isLogged = false;


    login(): void {
        this._store.dispatch(setAuthenticated());
    }

    logout(): void {
         this._store.dispatch(setUnauththenticated());
    }
}
