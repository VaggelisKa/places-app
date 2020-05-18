import { createReducer, on, Action } from '@ngrx/store';
import * as PlaceActions from './places.actions';
import { Place } from '../models/place.model';

export interface PlaceState {
    places: Place[];
    place: Place;
    isLoading: boolean;
}

export interface State {
    place: PlaceState;
}

export const initialState: PlaceState = {
    places: null,
    place: null,
    isLoading: false
};

const authReducer = createReducer(
    initialState,
    on(PlaceActions.setPlaces, (state, {places}) => ({
        ...state,
        places: [...places]
    })),

    on(PlaceActions.setPlace, (state, {placeId}) => ({
        ...state,
        place: state.places.find(id => id.id === placeId)
    })),

    on(PlaceActions.addPlace, (state, {place}) => ({
        ...state,
        places: state.places.concat(place)
    })),

    on(PlaceActions.isPlaceLoading, state => ({
        ...state,
        isLoading: !state.isLoading
    }))
);

export const placesFeatureKey = 'place';

export const getPlaceState = (state: State) => state.place;

export function reducer(state: PlaceState, action: Action) {
    return authReducer(state, action);
}