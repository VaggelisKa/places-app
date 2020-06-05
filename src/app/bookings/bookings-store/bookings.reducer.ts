import { Booking } from '../models/booking.model';
import { createReducer, on, Action } from '@ngrx/store';
import * as BookingsActions from './bookings.actions';

export interface BookingsState {
    bookings: Booking[];
    isLoading: boolean;
    error: string;
}

export interface State {
    bookings: BookingsState;
}

export const initialState: BookingsState = {
    bookings: [],
    isLoading: false,
    error: null
};

const  bookingsReducer = createReducer(
    initialState,
    on(BookingsActions.setBookings, state => ({
        ...state,
        isLoading: true
    })),

    on(BookingsActions.setBookingsSuccess, (state, {bookings}) => ({
        ...state,
        bookings: [...bookings],
        isLoading: false
    })),

    on(BookingsActions.setBookingsFail, (state, {error}) => ({
        ...state,
        bookings: [],
        error,
        isLoading: false
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

    on(BookingsActions.addNewBookingFail, (state, {error}) => ({
        ...state,
        error,
        isLoading: false
    })),

    on(BookingsActions.deleteBooking, state => ({
        ...state,
        isLoading: true
    })),

    on(BookingsActions.deleteBookingSuccess, (state, {bookingId}) => ({
        ...state,
        bookings: state.bookings.filter(booking => booking.id !== bookingId),
        isLoading: false
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

