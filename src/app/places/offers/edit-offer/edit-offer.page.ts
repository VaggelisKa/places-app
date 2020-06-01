import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlacesService } from '../../places.service';
import { Place } from '../../models/place.model';
import { NavController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

import { Store, select } from '@ngrx/store';
import * as fromPlaces from '../../places-store/places.reducer';
import * as placesSelectors from '../../places-store/places.selectors';
import * as placesActions from '../../places-store/places.actions';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  private maxYear: string;
  private currentDate: string;
  private minAvailableTo: string;
  editOfferForm: FormGroup;
  offer: Place;

  constructor(private _route: ActivatedRoute,
              private _placesService: PlacesService,
              private _navController: NavController,
              private _store: Store<fromPlaces.State>,
              private _loadingController: LoadingController,
              private _router: Router) { }

  ngOnInit() {
    this._route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this._navController.navigateBack('/places/tabs/offers');
      }

      this._placesService.getPlace(paramMap.get('placeId'));
      this._store.pipe(select(placesSelectors.getPlace)).subscribe(offer => {
        this.offer = offer;
      });

      this.maxYear = (new Date().getFullYear() + 4).toString();
      this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

      const nextDay = new Date().getDate() + 1;
      if (nextDay < 10) {
        this.minAvailableTo = formatDate(new Date(), `yyyy-MM-'0'${nextDay}`, 'en');
      } else {
        this.minAvailableTo = formatDate(new Date(), `yyyy-MM-${nextDay}`, 'en');
      }

      this.editOfferForm = new FormGroup({
        title: new FormControl(this.offer.title, [Validators.required, Validators.minLength(3)]),
        description: new FormControl(this.offer.description, Validators.maxLength(1000)),
        price: new FormControl(this.offer.price, [Validators.required, Validators.min(10)]),
        availableFromDate: new FormControl(this.offer.availableFrom.toISOString(), Validators.required),
        availableToDate: new FormControl(this.offer.availableTo.toISOString(), Validators.required),
      });
    });
  }

  get f() {
    return this.editOfferForm.controls;
  }

  async onEditOffer() {
    if (this.editOfferForm.invalid) {
      return;
    }
    const updatedPlace: Place = {
      id: this.offer.id,
      userId: this.offer.userId,
      title: this.editOfferForm.value.title,
      description: this.editOfferForm.value.description,
      price: this.editOfferForm.value.price,
      image: this.offer.image,
      availableFrom: new Date(this.editOfferForm.value.availableFromDate),
      availableTo: new Date(this.editOfferForm.value.availableToDate),
    };

    this._store.dispatch(placesActions.updatePlace({updatedPlace: updatedPlace}));

    this._store.pipe(select(placesSelectors.getPlaces));


    const loading = await this._loadingController.create({
      message: 'Updating...',
      spinner: 'bubbles'
    });
    await loading.present();

    this._store.pipe(select(placesSelectors.placesLoading)).subscribe(result => {
      if (!result) {
        loading.dismiss();
      }
    });

    await loading.onDidDismiss().then((_) => {
      this.editOfferForm.reset();
      this._router.navigate(['/places/tabs/offers']);
    });
  }

}
