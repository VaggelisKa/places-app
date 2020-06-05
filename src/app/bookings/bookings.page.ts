import { Component, OnInit } from '@angular/core';
import { BookingsService } from './services/bookings.service';
import { Booking } from './models/booking.model';
import { IonItemSliding } from '@ionic/angular';
import { Observable } from 'rxjs';

import * as fromBookings from './bookings-store/bookings.reducer';
import * as bookingsActions from './bookings-store/bookings.actions';
import * as BookingsSelectors from './bookings-store/bookings.selectors';
import { Store, select } from '@ngrx/store';
import { ControllersService } from '../shared/services/controllers.service';


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  bookings: Booking[];
  isLoading$: Observable<boolean>;

  constructor(private _bookingsService: BookingsService,
              private _store: Store<fromBookings.State>,
              private _controllersService: ControllersService) { }

  ngOnInit() {
    this._store.dispatch(bookingsActions.setBookings());
    this._store.pipe(select(BookingsSelectors.getBookings)).subscribe(bookings => {
      this.bookings = bookings;
    });
    this.isLoading$ = this._store.pipe(select(BookingsSelectors.getBookingsLoadingState));
    this._store.pipe(select(BookingsSelectors.getBookingsError)).subscribe(error => {
      if (error) {
        this._controllersService.errorAlert(error);
      }
    });
  }

  onDelete(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();

    this._store.dispatch(bookingsActions.deleteBooking({bookingId: offerId}));
  }

}
