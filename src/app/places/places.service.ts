import { Injectable } from '@angular/core';
import { Place } from './models/place.model';

import { Store } from '@ngrx/store';
import * as fromPlaces from './places-store/places.reducer';
import * as PlacesActions from './places-store/places.actions';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';

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
  private newPlace: Place;

  private places: Place[] = [
    {
      id: 'p1',
      userId: 'abc',
      title: 'New York Mansion',
      description: 'lavish',
      image: [
        'https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1440,w_2560,x_0,y_0/dpr_1.5/c_limit,w_1044/fl_lossy,q_auto/v1541016891/181031-carrier-payne-tease_tk805s',
        'https://townsquare.media/site/706/files/2019/12/RS9295_177496804-scr.jpg?w=980&q=75'
      ],
      price: 20000,
      availableFrom: new Date('2020-06-04'),
      availableTo: new Date('2020-08-04')
    },
    {
      id: 'p2',
      userId: 'abdbddb',
      title: 'Greek Bangalow',
      description: 'nice',
      image: ['https://i.pinimg.com/originals/9a/77/4f/9a774f8f0fb89fce6f29d8b062ca51d7.jpg'],
      price: 100,
      availableFrom: new Date('2020-10-04'),
      availableTo: new Date('2020-10-12')
    },
    {
      id: 'p3',
      userId: 'opopopop',
      title: 'Paris Suite',
      description: 'Kinda nice',
      image: ['https://res.klook.com/image/upload/fl_lossy.progressive/q_auto/f_auto/c_fill/blogen/2018/06/blog-cover-6.jpg'],
      price: 100,
      availableFrom: new Date('2020-10-04'),
      availableTo: new Date('2020-10-12')
    }
  ];

  // getPlaces(): void {
  //   this._store.dispatch(PlacesActions.setPlaces({places: [...this.places]}));
  // }

  getPlace(id: string): void {
    this._store.dispatch(PlacesActions.setPlace({placeId: id}));
  }

  fetchPlaces() {
    return this._http.get<{ [key: string]: PlaceData }>('https://places-app-7aa49.firebaseio.com/offered-places.json')
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
    return this._http.post<{name: string}>('https://places-app-7aa49.firebaseio.com/offered-places.json', newPlace);
  }

  updateOffer(placeId: string, updatedPlace: Place) {
    return this._http.put(`https://places-app-7aa49.firebaseio.com/offered-places/${placeId}.json`, {...updatedPlace, id: null});
  }

  deleteOffer(placeId: string) {
    setTimeout(() => {
      this._store.dispatch(PlacesActions.deletePlace({placeId: placeId}));
      this._store.dispatch(PlacesActions.isPlaceLoading());
    }, 1000);
    this._store.dispatch(PlacesActions.isPlaceLoading());
  }

}
