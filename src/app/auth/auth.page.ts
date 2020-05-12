import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isAuth = false;

  constructor(private _authService: AuthService,
              private _router: Router) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    this._authService.login();
    this._router.navigate(['/places/tabs/discover']);
  }

}
