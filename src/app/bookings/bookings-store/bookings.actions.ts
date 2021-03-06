import { createAction, props } from '@ngrx/store';
import { Booking } from '../models/booking.model';

// Set Bookings Actions
export const setBookings = createAction(
    '[Bookings Page] Set Bookings',
);

export const setBookingsSuccess = createAction(
    '[Bookings Page] Set Bookings Success',
    props<{bookings: Booking[]}>()
);

export const setBookingsFail = createAction(
    '[Bookings Page] Set Bookings Fail',
    props<{error: string}>()
);

// Add Booking Actions
export const addNewBooking = createAction(
    '[Bookings Page] Add Booking',
    props<{newBooking: Booking}>()
);

export const addNewBookingSuccess = createAction(
    '[Bookings Page] Add Booking Success',
    props<{newBooking: Booking}>()
);

export const addNewBookingFail = createAction(
    '[Bookings Page] Add Booking Fail',
    props<{error: string}>()
);

// Delete Booking Actions
export const deleteBooking = createAction(
    '[Bookings Page] Delete Booking',
    props<{bookingId: string}>()
);

export const deleteBookingSuccess = createAction(
    '[Bookings Page] Delete Booking Success',
    props<{bookingId: string}>()
);

export const deleteBookingFail = createAction(
    '[Bookings Page] Delete Booking Fail',
    props<{error: string}>()
);

export const bookingsLoading = createAction(
    '[Bookings Page] Bookings Loading State'
);
