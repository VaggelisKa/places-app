import { Booking } from '../models/booking.model';
import { createReducer, on, Action } from '@ngrx/store';
import * as BookingsActions from './bookings.actions';

export interface BookingsState {
    bookings: Booking[];
    isLoading: boolean;
}

export interface State {
    bookings: BookingsState;
}

export const initialState: BookingsState = {
    bookings: [],
    isLoading: false
};

const  bookingsReducer = createReducer(
    initialState,
    on(BookingsActions.setBookings, (state, {bookings}) => ({
        ...state,
        bookings: [...bookings]
    })),

    on(BookingsActions.addNewBooking, state => ({
        ...state,
        isLoading: true
    })),

    on(BookingsActions.addNewBookingSuccess, (state, {newBooking}) => ({
        ...state,
        bookings: state.bookings.concat(newBooking),
        isLoading: false
    })),

    on(BookingsActions.deleteBooking, (state, {bookingId}) => ({
        ...state,
        bookings: state.bookings.filter(booking => booking.id !== bookingId)
    })),

    on(BookingsActions.bookingsLoading, state => ({
        ...state,
        isLoading: !state.isLoading
    }))
);

export const bookingsFeatureKey = 'bookings';

export const getBookingsState = (state: State) => state.bookings;

export function reducer(state: BookingsState, action: Action) {
    return bookingsReducer(state, action);
}

