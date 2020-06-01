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
    places: [],
    place: null,
    isLoading: false
};

const placesReducer = createReducer(
    initialState,
    on(PlaceActions.setPlaces, state => ({
        ...state,
        isLoading: true
    })),

    on(PlaceActions.setPlacesSuccess, (state, {places}) => ({
        ...state,
        places: [...places],
        isLoading: false
    })),

    on(PlaceActions.setPlace, (state, {placeId}) => ({
        ...state,
        place: state.places.find(id => id.id === placeId)
    })),

    on(PlaceActions.addPlace, state => ({
        ...state,
        isLoading: true
    })),

    on(PlaceActions.addNewPlaceSuccess, (state, {place}) => ({
        ...state,
        places: state.places.concat(place),
        isLoading: false
    })),


    on(PlaceActions.updatePlace, state => ({
        ...state,
        isLoading: true
    })),

    on(PlaceActions.updatePlaceSuccess, (state,  {updatedPlace}) => ({
        ...state,
        places: state.places.map(p => (p.id === updatedPlace.id ? updatedPlace : p)),
        isLoading: false
    })),

    on(PlaceActions.deletePlace, state => ({
        ...state,
        isLoading: true
    })),

    on(PlaceActions.deletePlaceSuccess, (state,  {placeId}) => ({
        ...state,
        places: state.places.filter(place => place.id !== placeId),
        isLoading: false
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
