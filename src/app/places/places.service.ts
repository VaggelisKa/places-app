import { Injectable } from '@angular/core';
import { Place } from './models/place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private places: Place[] = [
    {
      id: 'p1',
      userId: 'abc',
      title: 'New York Mansion',
      description: 'lavish',
      image: 'https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1440,w_2560,x_0,y_0/dpr_1.5/c_limit,w_1044/fl_lossy,q_auto/v1541016891/181031-carrier-payne-tease_tk805s',
      price: 20000,
      availableFrom: new Date('2020-06-04'),
      availableTo: new Date('2020-08-04')
    },
    {
      id: 'p2',
      userId: 'abdbddb',
      title: 'Greek Bangalow',
      description: 'nice',
      image: 'https://i.pinimg.com/originals/9a/77/4f/9a774f8f0fb89fce6f29d8b062ca51d7.jpg',
      price: 100,
      availableFrom: new Date('2020-10-04'),
      availableTo: new Date('2020-10-12')
    }
  ];

  constructor() { }

  getPlaces(): Place[] {
    return [...this.places];
  }

  getPlace(id: string): Place {
    return {...this.places.find(p => p.id === id)};
  }

}
