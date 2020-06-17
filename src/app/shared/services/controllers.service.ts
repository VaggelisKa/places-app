import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class ControllersService {
    constructor(private _alertController: AlertController,
                private _router: Router) {}

    async errorAlert(errorMessage: string, id?: string) {
        if (id) {
          const alertWithRetry = await this._alertController.create({
            header: 'Error Occured!',
            message: errorMessage + ', please try again later!',
            buttons: [
              {
                text: 'Retry',
                handler: (_) => {
                  this._router.navigate([`/places/tabs/discover/${id}`]);
                }
              },
              {
                text: 'I Understand'
              }
            ]
          });
          await alertWithRetry.present();
        } else {
          const alert = await this._alertController.create({
            header: 'Error Occured!',
            message: errorMessage + ', please try again later!',
            buttons: [{text: 'I Understand', role: 'cancel'}]
          });

          await alert.present();
          }
        }
}
