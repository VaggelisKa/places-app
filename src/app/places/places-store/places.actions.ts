import { createAction, props } from '@ngrx/store';
import { Place } from '../models/place.model';

export const setPlaces = createAction(
    '[Offers Page] Set Places'
);

export const setPlacesSuccess = createAction(
    '[Offers Page] Set Places Success',
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

export const addNewPlaceSuccess = createAction(
    '[Offers Page] Add Place Success',
    props<{place: Place}>()
);

export const addNewPlaceFail = createAction(
    '[Offers Page] Add Place Fail',
    props<{error: string}>()
);

export const updatePlace = createAction(
    '[Offers Page] Update Place',
    props<{updatedPlace: Place}>()
);

export const updatePlaceSuccess = createAction(
    '[Offers Page] Update Place Success',
    props<{updatedPlace: Place}>()
);

export const deletePlace = createAction(
    '[Offers Page] Delete Place',
    props<{placeId: string}>()
);

export const deletePlaceSuccess = createAction(
    '[Offers Page] Delete Place Success',
    props<{placeId: string}>()
);

