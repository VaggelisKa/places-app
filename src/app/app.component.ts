import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Plugins, Capacitor } from '@capacitor/core';

import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private _authService: AuthService,
    private _router: Router,
    private _themeService: ThemeService
  ) {
    this.initializeApp();
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
    this._router.navigate(['/auth/login']);
  }
}
