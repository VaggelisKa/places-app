import { Component, OnInit } from '@angular/core';
import { Place } from '../models/place.model';

import { Store, select } from '@ngrx/store';
import * as fromPlaces from '../places-store/places.reducer';
import * as placesSelectors from '../places-store/places.selectors';
import * as placesActions from '../places-store/places.actions';
import { Observable } from 'rxjs';
import { ControllersService } from 'src/app/shared/services/controllers.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  loadedPlaces: Place[];
  listedLoadedPlaces: Place[];
  availablePlaces: Place[];
  isLoading$: Observable<boolean>;
  private filter = 'all';

  constructor(private _controllersService: ControllersService,
              private _store: Store<fromPlaces.State>) { }

  ngOnInit(): void {
    this.loadingPlaces();
    this._store.pipe(select(placesSelectors.getError)).subscribe(error => {
      if (error) {
        this._controllersService.errorAlert(error);
      }
    });
  }

  loadingPlaces(): void {
    this._store.dispatch(placesActions.setPlaces());

    this._store.pipe(select(placesSelectors.getPlaces)).subscribe(result => {
      console.log(result);
      this.loadedPlaces = result;
      this.availablePlaces = this.loadedPlaces;
      this.segmentChanged(this.filter);
    });

    this.isLoading$ = this._store.pipe(select(placesSelectors.placesLoading));
  }

  segmentChanged(filter: string): void {
    if (filter === 'available') {
      // this._store.pipe(select(placesSelectors.getBookablePlaces)).subscribe(bookablePlaces => {
      //   this.availablePlaces = bookablePlaces;
      //   this.filter = filter;
      // });
      this.availablePlaces = this.loadedPlaces.filter(place => place.userId !== 'abcde');
      this.filter = filter;
    } else {
      this.availablePlaces = this.loadedPlaces;
      this.filter = filter;
    }
  }

}
