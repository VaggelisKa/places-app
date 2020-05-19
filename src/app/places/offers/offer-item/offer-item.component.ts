import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../../models/place.model';

import { Store, select } from '@ngrx/store';
import * as fromPlaces from '../../placesStore/places.reducer';
import * as placesSelectors from '../../placesStore/places.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss'],
})
export class OfferItemComponent implements OnInit {
  @Input() offer: Place;
  isLoading$: Observable<boolean>;

  constructor(private _store: Store<fromPlaces.State>) {}

  ngOnInit() {
    this.isLoading$ = this._store.pipe(select(placesSelectors.placesLoading));
  }

  getDummyDate(): Date {
    return new Date();
  }
}
