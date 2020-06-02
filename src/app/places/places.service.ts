import { Injectable } from '@angular/core';
import { Place } from './models/place.model';
import { environment } from '../../environments/environment';

import { Store } from '@ngrx/store';
import * as fromPlaces from './places-store/places.reducer';
import * as PlacesActions from './places-store/places.actions';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AlertController } from '@ionic/angular';

interface PlaceData {
  availableFrom: string;
  availableTo: string;
  description: string;
  image: Array<string>;
  price: number;
  title: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  constructor(private _store: Store<fromPlaces.State>,
              private _http: HttpClient,
              private _alertController: AlertController) {}

  private readonly path = environment.firebaseUrl + 'offered-places';

  getPlace(id: string): void {
    this._store.dispatch(PlacesActions.setPlace({placeId: id}));
  }

  fetchPlaces(): Observable<Place[]> {
    return this._http
      .get<{ [key: string]: PlaceData }>(this.path + '.json')
        .pipe(map(resData => {
          const places: Place[] = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              places.push({
                id: key,
                userId: resData[key].userId,
                title: resData[key].title,
                description: resData[key].description,
                image: resData[key].image,
                price: resData[key].price,
                availableFrom: new Date(resData[key].availableFrom),
                availableTo: new Date(resData[key].availableTo)
              });
            }
          }
          return places;
        }), catchError((error: HttpErrorResponse) => throwError(error.status + ' ' + error.statusText))
        );
  }

  addNewPlace(newPlace: Place): Observable<{name: string}> {
    return this._http
      .post<{name: string}>(this.path + '.json', newPlace)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error.status + ' ' + error.statusText)));
  }

  updateOffer(placeId: string, updatedPlace: Place): Observable<Object> {
    return this._http
      .put(`${this.path}/${placeId}.json`, {...updatedPlace, id: null})
      .pipe(catchError((error: HttpErrorResponse) => throwError(error.status + ' ' + error.statusText)));
  }

  deleteOffer(placeId: string): Observable<Object> {
    return this._http
      .delete(`${this.path}/${placeId}.json`)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error.status + ' ' + error.statusText)));
  }

  async errorAlert(errorMessage: string) {
    const alert = await this._alertController.create({
      header: 'Error Occured!',
      message: errorMessage,
      buttons: ['I Understand']
    });

    await alert.present();
  }

}
