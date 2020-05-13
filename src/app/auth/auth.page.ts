import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromAuth from './auth-store/auth.reducer';
import * as AuthSelectors from './auth-store/auth.selectors';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isAuth$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  constructor(private _authService: AuthService,
              private _router: Router,
              private _store: Store<fromAuth.State>) { }

  ngOnInit(): void {
    this.isAuth$ = this._store.pipe(select(AuthSelectors.getIsAuth));
    this.isLoading$ = this._store.pipe(select(AuthSelectors.authLoading));
  }

  onLogin(): void {
    this._authService.login();
  }

}
