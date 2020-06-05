import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Store } from '@ngrx/store';
import * as fromBookings from '../bookings-store/bookings.reducer';
import * as BookingsActions from '../bookings-store/bookings.actions';
import { catchError, tap, map } from 'rxjs/operators';
import { throwError, pipe } from 'rxjs';

interface BookingData {
    dateFrom: string;
    dateTo: string;
    firstName: string;
    guestNumber: string;
    lastName: string;
    placeId: string;
    placeTitle: string;
    userId: string;
}

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

    fetchBookings() {
        return this._http
            .get<{[key: string]: BookingData}>(this.path + `.json?orderBy="userId"&equalTo="${'abcde'}"`)
            .pipe(map(bookingData => {
                const bookings: Booking[] = [];
                for (const key in bookingData) {
                    if (bookingData.hasOwnProperty(key)) {
                        bookings.push({
                            id: key,
                            placeId: bookingData[key].placeId,
                            userId: bookingData[key].userId,
                            placeTitle: bookingData[key].placeTitle,
                            firstName: bookingData[key].firstName,
                            lastName: bookingData[key].lastName,
                            guestNumber: +bookingData[key].guestNumber,
                            dateFrom: new Date(bookingData[key].dateFrom),
                            dateTo: new Date(bookingData[key].dateTo)
                        });
                    }
                }
                return bookings;
            }), catchError((err: HttpErrorResponse) => throwError('Error Code: ' + err.status + ' with text: ' + err.statusText))
            );
    }

    addBooking(newBooking: Booking) {
        return this._http
            .post<{name: string}>(this.path + '.json', newBooking)
            .pipe(catchError((err: HttpErrorResponse) => throwError('Error Code: ' + err.status + ' with text: ' + err.statusText)));
    }

    deleteBooking (id: string) {
        return this._http
            .delete(`${this.path}/${id}.json`)
            .pipe(catchError((err: HttpErrorResponse) => throwError('Error Code: ' + err.status + ' with text: ' + err.statusText)));
    }
}
