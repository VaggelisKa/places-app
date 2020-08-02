import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins, Capacitor } from '@capacitor/core';
import { ThemeService } from './theme.service';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private _authService: AuthService,
    private _themeService: ThemeService  ) {
    this.initializeApp();
  }

  ngOnInit(): void {}

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide();
      }
    });
  }

  toggleDarkMode() {
    this._themeService.toggleAppTheme();
  }

  onLogout(): void {
    this._authService.logout();
  }
}
