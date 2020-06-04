import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ControllersService {
    constructor(private _alertController: AlertController) {}

    async errorAlert(errorMessage: string) {
        const alert = await this._alertController.create({
          header: 'Error Occured!',
          message: errorMessage + ', please try again later!',
          buttons: ['I Understand']
        });

        await alert.present();
      }
}
