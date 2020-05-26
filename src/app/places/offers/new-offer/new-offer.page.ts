import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlacesService } from '../../places.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import * as fromPlaces from '../../places-store/places.reducer';
import * as placesSelectors from '../../places-store/places.selectors';
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
  images = [];

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
      description: new FormControl(null, Validators.maxLength(1000)),
      price: new FormControl(10, [Validators.required, Validators.min(10)]),
      imagePath: new FormControl(null, [
        Validators.required,
        Validators.pattern(new RegExp(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g))
      ]),
      availableFromDate: new FormControl(null, Validators.required),
      availableToDate: new FormControl(null, Validators.required),
    });
  }

  get f(): any {
    return this.newOfferForm.controls;
  }

  isUrl(value: string) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)* ' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i');
    return !!pattern.test(value);
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
        const filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                const reader = new FileReader();

                // tslint:disable-next-line: no-shadowed-variable
                reader.onload = (event) => {
                   this.images.push(event.target.result);

                   this.newOfferForm.patchValue({
                      fileSource: this.images
                   });
                };
                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }

  async onCreateOffer() {
    if (this.newOfferForm.invalid) {
      return;
    }
    this._placesService.addNewPlace(
      this.newOfferForm.value.title,
      this.newOfferForm.value.description,
      this.newOfferForm.value.price,
      this.newOfferForm.value.imagePath,
      new Date(this.newOfferForm.value.availableFromDate),
      new Date(this.newOfferForm.value.availableToDate),
    );

    console.log(this.newOfferForm.value);

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
