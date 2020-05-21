import { createAction, props } from '@ngrx/store';
import { Place } from '../models/place.model';

export const setPlaces = createAction(
    '[Offers Page] Set Places',
    props<{places: Place[]}>()
);

export const setPlace = createAction(
    '[Offers Page] Set Place',
    props<{placeId: string}>()
);

export const addPlace = createAction(
    '[Offers Page] Add Place',
    props<{place: Place}>()
);

export const updatePlace = createAction(
    '[Offers Page] Update Places',
    props<{updatedPlaces: Place[]}>()
);

export const deletePlace = createAction(
    '[Offers Page] Delete Places',
    props<{placeId: string}>()
);


export const isPlaceLoading = createAction (
    '[Place Loading State] Is Place Loading'
);
