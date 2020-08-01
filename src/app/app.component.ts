import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Plugins, Capacitor } from '@capacitor/core';

import { getIsAuth } from './auth/auth-store/auth.selectors';
import * as fromAuth from './auth/auth-store/auth.reducer';

import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { ThemeService } from './theme.service';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{
  constructor(
    private platform: Platform,
    private _authService: AuthService,
    private _router: Router,
    private _themeService: ThemeService,
    private _store: Store<fromAuth.State>
  ) {
    this.initializeApp();
  }

  previousAuthState: any;

  ngOnInit(): void {

  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide();
      }
    });
  }

  toggleDarkMode(event: any) {
    this._themeService.toggleAppTheme();
  }

  onLogout(): void {
    this._authService.logout();
  }
}
