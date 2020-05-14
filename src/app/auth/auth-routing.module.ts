import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthPage } from './login/auth.page';

const routes: Routes = [
    {
      path: 'login',
      component: AuthPage
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class AuthRoutingModule {}
