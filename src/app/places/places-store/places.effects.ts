import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PlacesService } from '../places.service';
import { mergeMap, map, tap, delay, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import * as placesActions from './places.actions';
import { of } from 'rxjs';

@Injectable()
export class PlacesEffects {
    constructor(private actions$: Actions,
                private _placesService: PlacesService) {}

    loadPlaces$ = createEffect(() =>
        this.actions$.pipe(
            ofType(placesActions.setPlaces),
            mergeMap(() => this._placesService.fetchPlaces()
                .pipe(
                    tap(resData => {
                        console.log(resData);
                    }),
                    map(res => placesActions.setPlacesSuccess({places: res})),
                    catchError(error => of(placesActions.setPlacesFail({error: error})))
                )
            )
        ));

    addPlace$ = createEffect(() =>
        this.actions$.pipe(
            ofType(placesActions.addPlace),
            map(action => action.place),
            mergeMap(place => this._placesService.addNewPlace({...place, id: null})
                .pipe(
                    tap(resData => {
                        console.log(resData);
                    }),
                    map(res => placesActions.addNewPlaceSuccess({place: {...place, id: res.name}})
                    )
                )
            )
        )
    );

    updateOffer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(placesActions.updatePlace),
            map(action => action.updatedPlace),
            mergeMap(updatedPlace => this._placesService.updateOffer(updatedPlace.id, updatedPlace)
                .pipe(
                    map((_) => placesActions.updatePlaceSuccess({updatedPlace: updatedPlace}))
                )
            )
        )
    );

    deleteOffer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(placesActions.deletePlace),
            map(action => action.placeId),
            mergeMap(id => this._placesService.deleteOffer(id)
                .pipe(
                    map((_) => placesActions.deletePlaceSuccess({placeId: id}))
                )
            )
        )
    );
}
