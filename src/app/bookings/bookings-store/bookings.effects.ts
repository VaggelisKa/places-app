import { Actions } from '@ngrx/effects';
import { BookingsService } from '../services/bookings.service';

export class BookingsEffects {
    constructor(private actions$: Actions,
                private _bookingsService: BookingsService) {}
}
