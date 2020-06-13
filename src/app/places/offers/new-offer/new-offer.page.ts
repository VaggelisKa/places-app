import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import * as fromPlaces from '../../places-store/places.reducer';
import * as placesSelectors from '../../places-store/places.selectors';
import * as placesActions from '../../places-store/places.actions';
import { Store, select } from '@ngrx/store';
import { Place } from '../../models/place.model';
import { ControllersService } from 'src/app/shared/services/controllers.service';
import { PlaceLocation } from 'src/app/shared/models/location.model';
import { base64toBlob } from './file-converter';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  private currentDate: string;
  private maxYear: string;
  newOfferForm: FormGroup;
  images = [];

  // Second date picker
  private minAvailableTo: string;

  constructor(private _controllersService: ControllersService,
              private _router: Router,
              private _loadingController: LoadingController,
              private _store: Store<fromPlaces.State>) { }

  ngOnInit(): void {
    this.maxYear = (new Date().getFullYear() + 4).toString();
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

    const nextDay = new Date().getDate() + 1;
    if (nextDay < 10) {
      this.minAvailableTo = formatDate(new Date(), `yyyy-MM-'0'${nextDay}`, 'en');
    } else {
      this.minAvailableTo = formatDate(new Date(), `yyyy-MM-${nextDay}`, 'en');
    }

    this.newOfferForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(null, Validators.maxLength(1000)),
      price: new FormControl(10, [Validators.required, Validators.min(10)]),
      imagePath: new FormControl(null),
      availableFromDate: new FormControl(null, Validators.required),
      availableToDate: new FormControl(null, Validators.required),
      location: new FormControl(null, Validators.required)
    });
  }

  get f(): any {
    return this.newOfferForm.controls;
  }

  onLocationPicked(location: PlaceLocation) {
    this.newOfferForm.patchValue({location: location});
  }

  onImagePicked(imageData: string | File) {
    let imageFile;
    if (typeof imageData === 'string') {
      try {
        imageFile = base64toBlob(imageData.replace('data:image/jpeg;base64,', ''), 'image/jpeg');
      } catch (error) {
        this._controllersService.errorAlert(error);
        return;
      }
    } else {
      imageFile = imageData;
    }
    this.newOfferForm.patchValue({ imagePath: imageFile });
  }

  async onCreateOffer() {
    if (this.newOfferForm.invalid || !this.newOfferForm.get('imagePath').value) {
      return;
    }
    console.log(this.newOfferForm.value);

    const newPlace: Place = {
      id: Math.random().toString(),
      userId: 'abcde',
      title: this.newOfferForm.value.title,
      description: this.newOfferForm.value.description,
      image: [this.newOfferForm.value.imagePath],
      price: +this.newOfferForm.value.price,
      availableFrom: new Date(this.newOfferForm.value.availableFromDate),
      availableTo: new Date(this.newOfferForm.value.availableToDate),
      location: this.newOfferForm.value.location
    };
    this._store.dispatch(placesActions.addPlace({place: newPlace}));

    const loading = await this._loadingController.create({
      message: 'Adding Offer...',
      spinner: 'bubbles'
    });
    await loading.present();

    this._store.pipe(select(placesSelectors.placesLoading)).subscribe(result => {
      if (!result) {
        loading.dismiss();
      }
    });

    this._store.pipe(select(placesSelectors.getError)).subscribe(error => {
      if (error) {
        this._controllersService.errorAlert(error);
      }
    });

    await loading.onDidDismiss().then((_) => {
      this.newOfferForm.reset();
      this._router.navigate(['/places/tabs/offers']);
    });
  }

}
