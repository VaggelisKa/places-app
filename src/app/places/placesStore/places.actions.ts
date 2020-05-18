import { createAction, props } from '@ngrx/store';
import { Place } from '../models/place.model';

export const addPlace = createAction(
    '[Offers Page] Add Place',
    props<Place>()
);

export const isPlaceLoading = createAction ('[Place Loading State] Is Place Loading');
