import { Component, OnInit } from '@angular/core';
import { Place } from '../../models/place.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {
  place: Place;

  constructor(private _route: ActivatedRoute,
              private _navController: NavController,
              private _placesService: PlacesService) { }

  ngOnInit() {
    this._route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this._navController.navigateBack('/places/tabs/offers');
      }

      this.place = this._placesService.getPlaces().find(p => p.id === paramMap.get('placeId'));
    });
  }

}
