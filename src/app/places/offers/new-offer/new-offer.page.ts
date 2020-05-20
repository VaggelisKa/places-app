import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlacesService } from '../../places.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import * as fromPlaces from '../../placesStore/places.reducer';
import * as placesSelectors from '../../placesStore/places.selectors';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  private currentDate: string;
  private maxYear: string;
  newOfferForm: FormGroup;

  // Second date picker
  private minAvailableTo: string;

  constructor(private _placesService: PlacesService,
              private _router: Router,
              private _loadingController: LoadingController,
              private _store: Store<fromPlaces.State>) { }

  ngOnInit(): void {
    this.maxYear = (new Date().getFullYear() + 4).toString();
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

    const nextDay = new Date().getDate() + 1;
    this.minAvailableTo = formatDate(new Date(), `yyyy-MM-${nextDay}`, 'en');

    this.newOfferForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(null, Validators.maxLength(100)),
      price: new FormControl(10, [Validators.required, Validators.min(10)]),
      availableFromDate: new FormControl(null, Validators.required),
      availableToDate: new FormControl(null, Validators.required),
    });
  }

  get f(): any {
    return this.newOfferForm.controls;
  }

  async onCreateOffer(): Promise<void> {
    if (this.newOfferForm.invalid) {
      return;
    }
    this._placesService.addNewPlace(
      this.newOfferForm.value.title,
      this.newOfferForm.value.description,
      this.newOfferForm.value.price,
      this.newOfferForm.value.availableFromDate,
      this.newOfferForm.value.availableToDate,
    );

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

    await loading.onDidDismiss().then((_) => {
      this.newOfferForm.reset();
      this._router.navigate(['/places/tabs/offers']);
    });
  }

}
