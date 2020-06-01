import { Injectable } from '@angular/core';
import { Place } from './models/place.model';
import { environment } from '../../environments/environment';

import { Store } from '@ngrx/store';
import * as fromPlaces from './places-store/places.reducer';
import * as PlacesActions from './places-store/places.actions';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
              private _http: HttpClient) {}

  private readonly path = environment.firebaseUrl + 'offered-places';

  getPlace(id: string): void {
    this._store.dispatch(PlacesActions.setPlace({placeId: id}));
  }

  fetchPlaces() {
    return this._http.get<{ [key: string]: PlaceData }>(this.path + '.json')
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
      }));
  }

  addNewPlace (newPlace: Place) {
    return this._http.post<{name: string}>(this.path + '.json', newPlace);
  }

  updateOffer(placeId: string, updatedPlace: Place) {
    return this._http.put(`${this.path}/${placeId}.json`, {...updatedPlace, id: null});
  }

  deleteOffer(placeId: string) {
    return this._http.delete(`${this.path}/${placeId}.json`);
  }

}
