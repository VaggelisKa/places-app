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

const placesReducer = createReducer(
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

    on(PlaceActions.updatePlace, (state,  {updatedPlaces}) => ({
        ...state,
        places: [...updatedPlaces]
    })),

    on(PlaceActions.deletePlace, (state,  {placeId}) => ({
        ...state,
        places: state.places.filter(place => place.id !== placeId)
    })),

    on(PlaceActions.isPlaceLoading, state => ({
        ...state,
        isLoading: !state.isLoading
    }))
);

export const placesFeatureKey = 'place';

export const getPlaceState = (state: State) => state.place;

export function reducer(state: PlaceState, action: Action) {
    return placesReducer(state, action);
}
