import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { Place } from '../../models/place.model';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';

import { Store, select } from '@ngrx/store';
import * as fromPlace from '../../places-store/places.reducer';
import * as placeSelectors from '../../places-store/places.selectors';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place: Place;
  images = ['https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/24-city-of-auburn-new-york-images-jpg-1576525078.jpg', 'https://i.pinimg.com/originals/ae/a0/40/aea04037035e26c9dd0249bf06098e49.jpg'];

  constructor(private _route: ActivatedRoute,
              private _placesService: PlacesService,
              private _navController: NavController,
              private _modalController: ModalController,
              private _actionSheetController: ActionSheetController,
              private _store: Store<fromPlace.State>) { }

  ngOnInit() {
    this._route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this._navController.navigateBack('/places/tabs/discover');
      }

      this._placesService.getPlace(paramMap.get('placeId'));
      this._store.pipe(select(placeSelectors.getPlace)).subscribe(place => {
        this.place = place;
        this.images.push(place.image);
      });
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
      componentProps: {selectedPlace: this.place, selectedMode: mode},
    });
    await modal.present();

    const  data = await modal.onWillDismiss();
    console.log(data);
    return data;
  }

}
