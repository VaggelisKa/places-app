import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';

import * as fromAuth from '../auth-store/auth.reducer';
import * as AuthSelectors from '../auth-store/auth.selectors';
import * as authActions from '../auth-store/auth.actions';
import { Store, select } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import { ConfirmedValidator } from './confirm-passwords.validator';
import { User } from '../models/user.model';
import { UserCredentials } from '../models/userCredentials.model';
import { take } from 'rxjs/operators';
import { ControllersService } from 'src/app/shared/services/controllers.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  isAuth$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  constructor(private _router: Router,
              private _controllersService: ControllersService,
              private _loadingController: LoadingController,
              private _store: Store<fromAuth.State>,
              private _authService: AuthService,
              private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('password' , 'confirmPassword')
    });

    this.isAuth$ = this._store.pipe(select(AuthSelectors.getIsAuth));
    this.isLoading$ = this._store.pipe(select(AuthSelectors.authLoading));
  }

  get f(): any {
    return this.signupForm.controls;
  }

  onSwitchToLogin(): void {
    this._router.navigate(['/auth/login']);
  }

  async onSignup() {
    if (!this.signupForm.valid) {
      return;
    }

    const userCredentials: UserCredentials = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      returnSecureToken: true
    };
    this._store.dispatch(authActions.userSignup({credentials: userCredentials}));

    console.log(this.signupForm.value);
    const loading = await this._loadingController.create({
      message: 'Creating Account...',
      spinner: 'crescent'
    });
    await loading.present();

    this._store.pipe(select(AuthSelectors.authLoading)).subscribe(isLoading => {
      if (!isLoading) {
        loading.dismiss();
      }
    });

    this._store.pipe(take(1), select(AuthSelectors.authError)).subscribe(err => {
      if (err) {
        this._controllersService.errorAlert(err);
      }
    });

    await loading.onDidDismiss().then(() => {
      this.signupForm.reset();
    });
  }

}
