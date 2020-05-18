import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../models/place.model';
import { Router } from '@angular/router';

import { IonItemSliding } from '@ionic/angular';

import { Store, select } from '@ngrx/store';
import * as fromPlaces from '../placesStore/places.reducer';
import * as placesSelectors from '../placesStore/places.selectors';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  offers: Place[];

  constructor(private _placesService: PlacesService,
              private _router: Router,
              private _store: Store<fromPlaces.State>) { }

  ngOnInit() {
    this._store.pipe(select(placesSelectors.getPlaces)).subscribe(offers => {
      this.offers = offers;
    });
  }

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this._router.navigate(['places/tabs/offers/edit/' + offerId]);
  }

  onDelete(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
  }

}
