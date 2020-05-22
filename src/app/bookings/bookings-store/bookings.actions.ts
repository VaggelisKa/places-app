import { createAction, props } from '@ngrx/store';
import { Booking } from '../models/booking.model';

export const setBookings = createAction(
    '[Bookings Page] Set Bookings',
    props<{bookings: Booking[]}>()
);

export const addNewBooking = createAction(
    '[Bookings Page] Add Booking',
    props<{newBooking: Booking}>()
);

export const bookingsLoading = createAction(
    '[Bookings Page] Bookings Loading State'
);
