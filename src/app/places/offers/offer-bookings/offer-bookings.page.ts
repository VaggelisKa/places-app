import { Component, OnInit } from '@angular/core';
import { Place } from '../../models/place.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';

import { Store, select } from '@ngrx/store';
import * as fromPlaces from '../../places-store/places.reducer';
import * as placesSelectors from '../../places-store/places.selectors';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {
  place: Place;

  constructor(private _route: ActivatedRoute,
              private _navController: NavController,
              private _placesService: PlacesService,
              private _store: Store<fromPlaces.State>) { }

  ngOnInit() {
    this._route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this._navController.navigateBack('/places/tabs/offers');
        return;
      }

      this._placesService.getPlace(paramMap.get('placeId'));
      this._store.pipe(select(placesSelectors.getPlace)).subscribe(place => {
        this.place = place;
      });
    });
  }

}
