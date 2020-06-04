import { Component, OnInit } from '@angular/core';
import { Place } from '../models/place.model';
import { Router } from '@angular/router';

import { IonItemSliding, LoadingController } from '@ionic/angular';

import { Store, select } from '@ngrx/store';
import * as fromPlaces from '../places-store/places.reducer';
import * as placesSelectors from '../places-store/places.selectors';
import * as placesActions from '../places-store/places.actions';
import { Observable } from 'rxjs';
import { ControllersService } from 'src/app/shared/services/controllers.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  offers$: Observable<Place[]>;

  constructor(private _controllersService: ControllersService,
              private _router: Router,
              private _store: Store<fromPlaces.State>,
              private _loadingController: LoadingController) {}

  ngOnInit() {
    // this._store.dispatch(placesActions.setPlaces());
    this.offers$ = this._store.pipe(select(placesSelectors.getPlaces));

    this._store.pipe(select(placesSelectors.getError)).subscribe(error => {
      if (error) {
        this._controllersService.errorAlert(error);
      }
    });
  }

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this._router.navigate(['places/tabs/offers/edit/' + offerId]);
  }

  async onDelete(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();

    this._store.dispatch(placesActions.deletePlace({placeId: offerId}));

    const loading = await this._loadingController.create({
      message: 'Deleting...',
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
