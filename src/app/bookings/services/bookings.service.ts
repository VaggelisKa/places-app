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
            firstName: 'Vasilis',
            lastName: 'karas',
            guestNumber: 7,
            dateFrom: new Date('2020-10-04'),
            dateTo: new Date('2020-10-10')
        },

        {
            id: 'oopsaospaosp',
            placeId: 'p2',
            userId: 'ioijfdjkfdsasaj',
            placeTitle: 'Greek bangalow',
            firstName: 'Nikos',
            lastName: 'Olatunji',
            guestNumber: 3,
            dateFrom: new Date('2020-10-04'),
            dateTo: new Date('2020-10-10')
        }
    ];

    addBooking(
        placeId: string,
        title: string,
        firstName: string,
        lastName: string,
        guestNumber: number,
        dateFrom: Date,
        dateTo: Date
        ): void {
            const newBooking: Booking = {
                id: Math.random().toString(),
                userId: 'sasasasas',
                placeId: placeId,
                placeTitle: title,
                firstName: firstName,
                lastName: lastName,
                guestNumber: guestNumber,
                dateFrom: dateFrom,
                dateTo: dateTo
            };

            this._store.dispatch(BookingsActions.addNewBooking({newBooking: newBooking}));
    }

    getBookings(): void {
        this._store.dispatch(BookingsActions.setBookings({bookings: this.bookings}));
    }

    onDelete (id: string): void {
        this._store.dispatch(BookingsActions.deleteBooking({bookingId: id}));
    }
}
