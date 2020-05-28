import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';

import { Store } from '@ngrx/store';
import * as fromBookings from '../bookings-store/bookings.reducer';
import * as BookingsActions from '../bookings-store/bookings.actions';

@Injectable({providedIn: 'root'})
export class BookingsService {
    constructor(private _store: Store<fromBookings.State>) {}

    private bookings: Booking[] = [
        {
            id: 'ohafhusdoad',
            placeId: 'p1',
            userId: 'ioijfdjkfdj',
            placeTitle: 'New york mansion',
            guestNumber: 7
        },

        {
            id: 'oopsaospaosp',
            placeId: 'p2',
            userId: 'ioijfdjkfdsasaj',
            placeTitle: 'Greek bangalow',
            guestNumber: 3
        }
    ];

    getBookings(): void {
        this._store.dispatch(BookingsActions.setBookings({bookings: this.bookings}));
    }

    onDelete (id: string): void {
        this._store.dispatch(BookingsActions.deleteBooking({bookingId: id}));
    }
}
