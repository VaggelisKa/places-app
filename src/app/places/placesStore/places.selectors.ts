import * as fromPlaces from './places.reducer';
import { createSelector } from '@ngrx/store';

export const placesLoading = createSelector(
    fromPlaces.getPlaceState,
    (state: fromPlaces.PlaceState) => state.isLoading
);
