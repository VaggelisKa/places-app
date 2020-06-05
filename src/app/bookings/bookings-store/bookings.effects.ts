import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookingsService } from '../services/bookings.service';

import * as bookingsActions from '../bookings-store/bookings.actions';
import { map, mergeMap, catchError, delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class BookingsEffects {
    constructor(private actions$: Actions,
                private _bookingsService: BookingsService) {}

    loadBookings$ = createEffect(() =>
        this.actions$.pipe(
            ofType(bookingsActions.setBookings),
            mergeMap(() => this._bookingsService.fetchBookings()
                .pipe(
                    map(bookings => bookingsActions.setBookingsSuccess({bookings}))
                )
            )
        )
    );

    addBooking$ = createEffect(() =>
        this.actions$.pipe(
            ofType(bookingsActions.addNewBooking),
            map(actions => actions.newBooking),
            mergeMap(booking => this._bookingsService.addBooking({...booking, id: null})
                .pipe(
                    map(res => bookingsActions.addNewBookingSuccess({newBooking: {...booking, id: res.name}})),
                    catchError(error => of(bookingsActions.addNewBookingFail({error})))
                )
            )
        )
    );
}
