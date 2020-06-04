import { createSelector } from '@ngrx/store';
import * as fromBookings from './bookings.reducer';

export const getBookings = createSelector(
    fromBookings.getBookingsState,
    (state: fromBookings.BookingsState) => state.bookings
);

export const getBookingsLoadingState = createSelector(
    fromBookings.getBookingsState,
    (state: fromBookings.BookingsState) => state.isLoading
);

export const getBookingsError = createSelector(
    fromBookings.getBookingsState,
    (state: fromBookings.BookingsState) => state.error
);
