import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthPage } from './login/auth.page';
import { SignupPage } from './signup/signup.page';

const routes: Routes = [
    {
      path: 'login',
      component: AuthPage
    },
  {
    path: 'signup',
    component: SignupPage
  }

  ];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class AuthRoutingModule {}
