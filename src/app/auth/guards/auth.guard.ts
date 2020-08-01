import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromAuth from '../auth-store/auth.reducer';
import { getIsAuth } from '../auth-store/auth.selectors';
import { switchMap, tap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad {
    isAuth: boolean;
    constructor(private _router: Router,
                private _store: Store<fromAuth.State>,
                private _authService: AuthService) {}

    canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
        // return this._store.pipe(select(getIsAuth)).pipe(
        //     take(1),
        //     switchMap(isAuthenticated => {
        //         if (!isAuthenticated) {
        //             return this._authService.autoLogin();
        //         } else {
        //             return of(isAuthenticated);
        //         }
        //     }),
        //     tap(isAuthenticated => {
        //         if (!isAuthenticated) {
        //             this._router.navigate(['/auth/login']);
        //         }
        //     })
        // );

        this._store.pipe(select(getIsAuth)).subscribe(isAuth => {
            this.isAuth = isAuth;
        });
        
        if (!this.isAuth) {
            return this._authService.autoLogin().pipe(
                tap(isAuth => {
                    if (!isAuth) {
                        this._router.navigate(['/auth/login']);
                        console.log('Hey');
                    }
                })
            );
        } else {
            return this.isAuth;
        }
    }
}
