import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PlacesService } from '../places.service';
import { mergeMap, map, switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import * as BookingsActions from './places.actions';

@Injectable()
export class PlacesEffects {
    constructor(private actions$: Actions,
                private _placesService: PlacesService) {}

    addPlace$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BookingsActions.addPlace),
            map(action => action.place),
            mergeMap(place => this._placesService.addNewPlace({...place, id: null})
                .pipe(
                    tap(resData => {
                        console.log(resData);
                    }),
                    map(res => BookingsActions.addNewPlaceSuccess({place: {...place, id: res.name}})
                    )
                )
            )
        )
    );
}
