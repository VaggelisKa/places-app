import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { Place } from '../../models/place.model';
import { NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

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
              private _navController: NavController) { }

  ngOnInit() {
    this._route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this._navController.navigateBack('/places/tabs/offers');
      }

      this.offer = this._placesService.getPlace(paramMap.get('placeId'));
    });

    this.maxYear = (new Date().getFullYear() + 4).toString();
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

    const nextDay = new Date().getDate() + 1;
    this.minAvailableTo = formatDate(new Date(), `yyyy-MM-${nextDay}`, 'en');

    this.editOfferForm = new FormGroup({
      title: new FormControl(this.offer.title, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(this.offer.description, Validators.maxLength(100)),
      price: new FormControl(this.offer.price, [Validators.required, Validators.min(10)]),
      availableFromDate: new FormControl(null, Validators.required),
      availableToDate: new FormControl(null, Validators.required),
    });
  }

  get f() {
    return this.editOfferForm.controls;
  }

  onEditOffer() {
    if (this.editOfferForm.invalid) {
      return;
    }
    console.log(this.editOfferForm.value);
  }

}
