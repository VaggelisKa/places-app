import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { Place } from '../../models/place.model';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place: Place;

  constructor(private _route: ActivatedRoute,
              private _placesService: PlacesService,
              private _navController: NavController,
              private _modalController: ModalController,
              private _actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this._route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this._navController.navigateBack('/places/tabs/discover');
      }

      this.place = this._placesService.getPlace(paramMap.get('placeId'));
    });
  }

  async onBookPlace() {
    const actionSheet = await this._actionSheetController.create({
      header: 'Choose an action...',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        icon: 'close'
      },

      {
        text: 'Select a date',
        icon: 'today-outline',
        handler: () => {
          this.openModal('select');
        }
      },

      {
        text: 'Choose random date',
        icon: 'help-circle-outline',
        handler: () => {
          this.openModal('random');
        }
      }
    ]
    });
    await actionSheet.present();

  }

  async openModal(mode: 'select' | 'random'): Promise<{}> {
    const modal = await this._modalController.create({
      component: CreateBookingComponent,
      componentProps: {selectedPlace: this.place},
    });
    await modal.present();

    const  data  = await modal.onWillDismiss();
    return data;
  }

}
