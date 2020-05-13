import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Store, select } from '@ngrx/store';

import * as fromAuth from '../auth-store/auth.reducer';
import { getIsAuth } from '../auth-store/auth.selectors';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad {
    isAuth: boolean;
    constructor(private _authService: AuthService,
                private _router: Router,
                private _store: Store<fromAuth.State>) {}

    canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
        this._store.pipe(select(getIsAuth)).subscribe(result => {
            this.isAuth = result;
        });
        if (!this.isAuth) {
            this._router.navigate(['/auth']);
        }
        return  this.isAuth;
    }
}
