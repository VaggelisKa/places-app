import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({providedIn: 'root'})
export class ThemeService {
    darkMode = false;

    constructor(private _platform: Platform) {
        this._platform.ready().then((_) => {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
            // tslint:disable-next-line: deprecation
            prefersDark.addListener(result => {
                this.setAppTheme(result.matches);
            });
        });
    }

    toggleAppTheme() {
        this.darkMode = !this.darkMode;
        this.setAppTheme(this.darkMode);
    }

    setAppTheme(dark: any) {
        this.darkMode = dark;

        if (this.darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }
}
