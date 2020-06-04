import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Store } from '@ngrx/store';
import * as fromBookings from '../bookings-store/bookings.reducer';
import * as BookingsActions from '../bookings-store/bookings.actions';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({providedIn: 'root'})
export class BookingsService {
    private readonly path = environment.firebaseUrl + 'bookings';

    constructor(private _store: Store<fromBookings.State>,
                private _http: HttpClient) {}

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

    addBooking(newBooking: Booking) {
        return this._http
            .post<{name: string}>(this.path + '.json', newBooking)
            .pipe(catchError((err: HttpErrorResponse) => throwError('Error Code: ' + err.status + ' with text: ' + err.statusText)));
    }

    getBookings(): void {
        this._store.dispatch(BookingsActions.setBookings({bookings: this.bookings}));
    }

    onDelete (id: string): void {
        this._store.dispatch(BookingsActions.deleteBooking({bookingId: id}));
    }
}
