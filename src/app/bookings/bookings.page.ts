import { Component, OnInit } from '@angular/core';
import { BookingsService } from './services/bookings.service';
import { Booking } from './models/booking.model';
import { IonItemSliding } from '@ionic/angular';

import * as fromBookings from './bookings-store/bookings.reducer';
import * as BookingsSelectors from './bookings-store/bookings.selectors';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  bookings: Booking[];

  constructor(private _bookingsService: BookingsService,
              private _store: Store<fromBookings.State>) { }

  ngOnInit() {
    this._bookingsService.getBookings();
    this._store.pipe(select(BookingsSelectors.getBookings)).subscribe(bookings => {
      this.bookings = bookings;
    });
    this._store.pipe(select(BookingsSelectors.getBookingsLoadingState)).subscribe(result => {
      console.log(result);
    });
  }

  onDelete(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();

    this._bookingsService.onDelete(offerId);
    this._store.pipe(select(BookingsSelectors.getBookings));
  }

}
