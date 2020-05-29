import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { Place } from 'src/app/places/models/place.model';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { formatDate } from '@angular/common';
import { BookingsService } from '../services/bookings.service';

import { Store, } from '@ngrx/store';
import * as fromBookings from '../bookings-store/bookings.reducer';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  @Input() selectedMode: 'select' | 'random';
  @ViewChild('f') form: NgForm;

  private minCheckinDate: string;
  private minAvailableTo: string;
  private checkinDate: string;
  private checkoutDate: string;

  constructor(private _modalController: ModalController,
              private _bookingsService: BookingsService,
              private _store: Store<fromBookings.State>) { }

  ngOnInit(): void {
    const nextDay = new Date().getDate() + 1;
    this.minAvailableTo = formatDate(new Date(), `yyyy-MM-${nextDay}`, 'en');

    let availableFrom;
    if (new Date() > this.selectedPlace.availableFrom) {
      availableFrom = new Date();
      this.minCheckinDate = new Date().toISOString();
    } else {
      availableFrom = new Date(this.selectedPlace.availableFrom);
      this.minCheckinDate = new Date(this.selectedPlace.availableFrom).toISOString();
    }

    const availableTo = new Date(this.selectedPlace.availableTo);
    if (this.selectedMode === 'random') {
      this.checkinDate = new Date(
        availableFrom.getTime() + Math.random()
        * (availableTo.getTime() - 7 * 24 * 3600 * 1000 - availableFrom.getTime())
      ).toISOString();

      this.checkoutDate = new Date (
        new Date(this.checkinDate).getTime() + Math.random()
        * (new Date(this.checkinDate).getTime() + 6 * 24 * 3600 * 1000 - new Date(this.checkinDate).getTime())
      ).toISOString();
    }
  }

  onClose(): void {
    this._modalController.dismiss(null, 'cancel');
  }

  onConfirm(): void {
    if (this.form.invalid) {
      return;
    }

    this._bookingsService.addBooking(
      this.selectedPlace.id,
      this.selectedPlace.title,
      this.form.value['firstName'],
      this.form.value['lastName'],
      this.form.value['numberOfGuests'],
      this.form.value['checkin'],
      this.form.value['checkout']
    );

    this._modalController.dismiss({
      message: 'Booked',
      bookingData: {
        firstName: this.form.value['firstName'],
        lastName: this.form.value['lastName'],
        numberOfGuests: this.form.value['numberOfGuests'],
        checkinDate: this.form.value['checkin'],
        checkoutDate: this.form.value['checkout']
      }
    }, 'Confirm');
  }

}
