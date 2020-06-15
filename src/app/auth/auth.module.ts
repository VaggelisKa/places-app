import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPage } from './login/auth.page';

import * as fromAuth from './auth-store/auth.reducer';
import { StoreModule } from '@ngrx/store';
import { AuthRoutingModule } from './auth-routing.module';
import { SignupPage } from './signup/signup.page';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth-store/auth.effects';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    StoreModule.forFeature(fromAuth.AuthFeatureKey, fromAuth.reducer),
    AuthRoutingModule,
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [AuthPage, SignupPage],
})
export class AuthPageModule {}
