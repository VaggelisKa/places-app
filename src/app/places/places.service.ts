import { Injectable } from '@angular/core';
import { Place } from './models/place.model';

import { Store } from '@ngrx/store';
import * as fromPlaces from './places-store/places.reducer';
import * as PlacesActions from './places-store/places.actions';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  constructor(private _store: Store<fromPlaces.State>) {}
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

  getPlaces(): void {
    this._store.dispatch(PlacesActions.setPlaces({places: [...this.places]}));
  }

  getPlace(id: string): void {
    this._store.dispatch(PlacesActions.setPlace({placeId: id}));
  }

  addNewPlace (title: string, description: string, price: number, dateFrom: Date, dateTo: Date) {
    this.newPlace = {
      id: Math.random().toString(),
      userId: 'abcde',
      title: title,
      description: description,
      image: ['https://i.pinimg.com/originals/9a/77/4f/9a774f8f0fb89fce6f29d8b062ca51d7.jpg'],
      price: price,
      availableFrom: dateFrom,
      availableTo: dateTo
  };

    setTimeout(() => {
      this._store.dispatch(PlacesActions.addPlace({place: this.newPlace}));
      this._store.dispatch(PlacesActions.isPlaceLoading());
    }, 1000);
    this._store.dispatch(PlacesActions.isPlaceLoading());
    this._store.dispatch(PlacesActions.setBookablePlaces({userId: 'abcde'}));
  }

  updateOffer(placeId: string, title: string, description: string, price: number, dateFrom: Date, dateTo: Date): void {
    const placeToUpdateIndex = this.places.findIndex(place => place.id === placeId);
    const updatedPlaces = [...this.places];
    updatedPlaces[placeToUpdateIndex] = {
      id: placeId,
      userId: 'sasasas',
      title: title,
      description: description,
      image: ['https://i.pinimg.com/originals/9a/77/4f/9a774f8f0fb89fce6f29d8b062ca51d7.jpg'],
      price: price,
      availableFrom: dateFrom,
      availableTo: dateTo
    };

    setTimeout(() => {
      this._store.dispatch(PlacesActions.updatePlace({
        updatedPlaces: updatedPlaces
      }));
      this._store.dispatch(PlacesActions.isPlaceLoading());
    }, 1000);
    this._store.dispatch(PlacesActions.isPlaceLoading());
  }

  deleteOffer(placeId: string) {
    setTimeout(() => {
      this._store.dispatch(PlacesActions.deletePlace({placeId: placeId}));
      this._store.dispatch(PlacesActions.isPlaceLoading());
    }, 1000);
    this._store.dispatch(PlacesActions.isPlaceLoading());
    console.log(this.places.length);
    this._store.dispatch(PlacesActions.setBookablePlaces({userId: 'abcde'}));
  }

}
