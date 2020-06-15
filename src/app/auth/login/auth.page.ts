import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromAuth from '../auth-store/auth.reducer';
import * as AuthSelectors from '../auth-store/auth.selectors';
import * as authActions from '../auth-store/auth.actions';

import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import { UserCredentials } from '../models/userCredentials.model';

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
              private _store: Store<fromAuth.State>,
              private _loadingController: LoadingController) { }

  ngOnInit(): void {
    this.isAuth$ = this._store.pipe(select(AuthSelectors.getIsAuth));
    this.isLoading$ = this._store.pipe(select(AuthSelectors.authLoading));
  }

  onSwitchToSignup(): void {
    this._router.navigate(['/auth/signup']);
  }

  async onLogin(form: NgForm) {
    const userCredentials: UserCredentials = {
      email: form.value.email,
      password: form.value.password
    };
    this._store.dispatch(authActions.userLogin({credentials: userCredentials}));

    const loading = await this._loadingController.create({
      message: 'Logging in...',
      spinner: 'crescent',
    });
    await loading.present();

    this._store.pipe(select(AuthSelectors.authLoading)).subscribe(isLoading => {
      if (!isLoading) {
        loading.dismiss();
        this._router.navigate(['/places/tabs/discover']);
      }
    });

    await loading.onDidDismiss().then(() => {
      form.reset();
    });
  }

}
