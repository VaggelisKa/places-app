import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as moment from 'moment';

import * as fromAuth from '../auth-store/auth.reducer';
import * as AuthSelectors from '../auth-store/auth.selectors';
import * as authActions from '../auth-store/auth.actions';

import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import { UserCredentials } from '../models/userCredentials.model';
import { ControllersService } from 'src/app/shared/services/controllers.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isAuth$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  constructor(private _authService: AuthService,
              private _controllersService: ControllersService,
              private _router: Router,
              private _store: Store<fromAuth.State>,
              private _loadingController: LoadingController) { }

  ngOnInit(): void {
    this.isAuth$ = this._store.pipe(select(AuthSelectors.getIsAuth));
    this.isLoading$ = this._store.pipe(select(AuthSelectors.authLoading));
    console.log(moment().add(3600, 'seconds').toDate());
  }

  onSwitchToSignup(): void {
    this._router.navigate(['/auth/signup']);
  }

  async onLogin(form: NgForm) {
    const userCredentials: UserCredentials = {
      email: form.value.email,
      password: form.value.password,
      returnSecureToken: true
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

    this._store.pipe(select(AuthSelectors.authError)).subscribe(err => {
      if (err) {
        this._controllersService.errorAlert(err);
      }
    });

    await loading.onDidDismiss().then(() => {
      form.reset();
    });
  }

}
