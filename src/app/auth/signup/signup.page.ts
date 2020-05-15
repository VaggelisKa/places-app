import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';

import * as fromAuth from '../auth-store/auth.reducer';
import * as AuthSelectors from '../auth-store/auth.selectors';
import { Store, select } from '@ngrx/store';
import { AuthService } from '../services/auth.service';

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
              private _loadingController: LoadingController,
              private _store: Store<fromAuth.State>,
              private _authService: AuthService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
      'password': new FormControl(null, Validators.required),
      'confirmPassword': new FormControl(null, Validators.required)
    });

    this.isAuth$ = this._store.pipe(select(AuthSelectors.getIsAuth));
    this.isLoading$ = this._store.pipe(select(AuthSelectors.authLoading));
  }

  onSwitchToLogin() {
    this._router.navigate(['/auth/login']);
  }

  async onSignup() {
    this._authService.signup();

    console.log(this.signupForm);
    const loading = await this._loadingController.create({
      message: 'Creating Account...',
      spinner: 'crescent',
      duration: 2000
    });
    await loading.present();
    await loading.onDidDismiss().then(() => {
      this.signupForm.reset();
    });
  }

}
