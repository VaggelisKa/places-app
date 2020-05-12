import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad {
    constructor(private _authService: AuthService,
                private _router: Router) {}

    canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
        if (!this._authService.getIsAuth()) {
            this._router.navigate(['/auth']);
        }
        return  this._authService.getIsAuth();
    }
}
