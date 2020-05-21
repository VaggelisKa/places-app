import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../models/place.model';

import { Store, select } from '@ngrx/store';
import * as fromPlaces from '../placesStore/places.reducer';
import * as placesSelectors from '../placesStore/places.selectors';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  loadedPlaces: Place[];
  listedLoadedPlaces: Place[];
  availablePlaces: Place[];

  constructor(private _placesService: PlacesService,
              private _store: Store<fromPlaces.State>) { }

  ngOnInit() {
    this._placesService.getPlaces();

    this._store.pipe(select(placesSelectors.getPlaces)).subscribe(result => {
      console.log(result);
      this.loadedPlaces = result;
      this.availablePlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.availablePlaces.slice(1);
    });
  }

  segmentChanged(event: CustomEvent<any>) {
    if (event.detail.value === 'available') {
      this._store.pipe(select(placesSelectors.getBookablePlaces)).subscribe(bookablePlaces => {
        this.availablePlaces = bookablePlaces;
        this.listedLoadedPlaces = this.availablePlaces.slice(1);
      });
    } else {
      this.availablePlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.availablePlaces.slice(1);
    }
  }

}
