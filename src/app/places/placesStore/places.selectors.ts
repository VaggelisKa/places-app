import * as fromPlaces from './places.reducer';
import { createSelector } from '@ngrx/store';

export const getNewPlace = createSelector(
    fromPlaces.getPlaceState,
    (state: fromPlaces.PlaceState) => state.place
);

export const placesLoading = createSelector(
    fromPlaces.getPlaceState,
    (state: fromPlaces.PlaceState) => state.isLoading
);
