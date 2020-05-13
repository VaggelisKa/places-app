import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../models/place.model';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  loadedPlaces: Place[];
  listedLoadedPlaces: Place[];

  constructor(private _placesService: PlacesService) { }

  ngOnInit() {
    this.loadedPlaces = this._placesService.getPlaces();
    this.listedLoadedPlaces = this.loadedPlaces.splice(1);
  }

  segmentChanged(event: CustomEvent<any>) {
    console.log(event.detail);
  }

}
