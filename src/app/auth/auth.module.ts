import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPage } from './login/auth.page';

import * as fromAuth from './auth-store/auth.reducer';
import { StoreModule } from '@ngrx/store';
import { AuthRoutingModule } from './auth-routing.module';
import { SignupPage } from './signup/signup.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreModule.forFeature(fromAuth.AuthFeatureKey, fromAuth.reducer),
    AuthRoutingModule
  ],
  declarations: [AuthPage, SignupPage],
})
export class AuthPageModule {}
