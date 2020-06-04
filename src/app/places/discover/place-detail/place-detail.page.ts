import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { Place } from '../../models/place.model';
import { NavController, ModalController, ActionSheetController, LoadingController } from '@ionic/angular';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';

import { Store, select } from '@ngrx/store';
import * as fromPlace from '../../places-store/places.reducer';
import * as placeSelectors from '../../places-store/places.selectors';

import * as fromBookings from '../../../bookings/bookings-store/bookings.reducer';
import * as bookingsSelectors from '../../../bookings/bookings-store/bookings.selectors';
import * as bookingActions from '../../../bookings/bookings-store/bookings.actions';

import { BookingsService } from 'src/app/bookings/services/bookings.service';
import { Booking } from 'src/app/bookings/models/booking.model';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  private user = 'abcde';
  place: Place;
  images = [];

  constructor(private _route: ActivatedRoute,
              private _placesService: PlacesService,
              private _navController: NavController,
              private _modalController: ModalController,
              private _actionSheetController: ActionSheetController,
              private _store: Store<fromPlace.State | fromBookings.State>,
              private _bookingsService: BookingsService,
              private _loadingController: LoadingController) { }

  ngOnInit() {
    this._route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this._navController.navigateBack('/places/tabs/discover');
      }

      this._placesService.getPlace(paramMap.get('placeId'));
      this._store.pipe(select(placeSelectors.getPlace)).subscribe(place => {
        this.place = place;
        this.images = this.images.concat(place.image);
      });
    });
  }

  async onBookPlace() {
    const actionSheet = await this._actionSheetController.create({
      header: 'Choose an action...',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        icon: 'close'
      },

      {
        text: 'Select a date',
        icon: 'today-outline',
        handler: () => {
          this.openModal('select');
        }
      },

      {
        text: 'Choose random date',
        icon: 'help-circle-outline',
        handler: () => {
          this.openModal('random');
        }
      }
    ]
    });
    await actionSheet.present();
  }

  async openModal(mode: 'select' | 'random'): Promise<{}> {
    const modal = await this._modalController.create({
      component: CreateBookingComponent,
      componentProps: {selectedPlace: this.place, selectedMode: mode},
    });
    await modal.present();

    const  data = await modal.onWillDismiss();
    console.log(data);

    if (data.role === 'Confirm') {
      const loading = await this._loadingController.create({
        spinner: 'bubbles',
        message: 'Adding new booking...'
      });
      await loading.present();

      const bookingData = data.data.bookingData;
      const newBooking: Booking = {
        id: Math.random().toString(),
        placeId: this.place.id,
        userId: 'abcde',
        placeTitle: this.place.title,
        firstName: bookingData.firstName,
        lastName: bookingData.lastName,
        guestNumber: bookingData.numberOfGuests,
        dateFrom: bookingData.checkinDate,
        dateTo: bookingData.checkoutDate
      };
      this._store.dispatch(bookingActions.addNewBooking({newBooking: newBooking}));

      this._store.pipe(select(bookingsSelectors.getBookingsLoadingState)).subscribe(isLoading => {
        if (!isLoading) {
          loading.dismiss();
        }
      });
    }

    return data;
  }

}
