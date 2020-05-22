import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../models/place.model';
import { Router } from '@angular/router';

import { IonItemSliding, LoadingController } from '@ionic/angular';

import { Store, select } from '@ngrx/store';
import * as fromPlaces from '../places-store/places.reducer';
import * as placesSelectors from '../places-store/places.selectors';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  offers: Place[];

  constructor(private _placesService: PlacesService,
              private _router: Router,
              private _store: Store<fromPlaces.State>,
              private _loadingController: LoadingController) { }

  ngOnInit() {
    this._store.pipe(select(placesSelectors.getPlaces)).subscribe(offers => {
      this.offers = offers;
    });
  }

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this._router.navigate(['places/tabs/offers/edit/' + offerId]);
  }

  async onDelete(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();

    this._placesService.deleteOffer(offerId);
    this._store.pipe(select(placesSelectors.getPlaces));


    const loading = await this._loadingController.create({
      message: 'Please wait...',
      spinner: 'bubbles'
    });
    await loading.present();

    this._store.pipe(select(placesSelectors.placesLoading)).subscribe(result => {
      if (!result) {
        loading.dismiss();
      }
    });
  }

}
