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

    on(BookingsActions.addNewBooking, (state, {newBooking}) => ({
        ...state,
        bookings: state.bookings.concat(newBooking)
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

