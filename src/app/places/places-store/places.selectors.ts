import * as fromPlaces from './places.reducer';
import { createSelector } from '@ngrx/store';

export const getPlaces = createSelector(
    fromPlaces.getPlaceState,
    (state: fromPlaces.PlaceState) => state.places
);

export const getPlace = createSelector(
    fromPlaces.getPlaceState,
    (state: fromPlaces.PlaceState) => state.place
);

export const placesLoading = createSelector(
    fromPlaces.getPlaceState,
    (state: fromPlaces.PlaceState) => state.isLoading
);

export const getError = createSelector(
    fromPlaces.getPlaceState,
    (state: fromPlaces.PlaceState) => state.error
);
