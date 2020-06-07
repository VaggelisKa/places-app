import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapModalComponent } from '../map-modal/map-modal.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { PlaceLocation } from '../models/location.model';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {

  constructor(private _modalController: ModalController,
              private _http: HttpClient) { }

  ngOnInit() {}

  async onPickLocation() {
    const modal = await this._modalController.create({
      component: MapModalComponent
    });
    await modal.present();

    const data = await modal.onWillDismiss();
    if (!data.data) {
      return;
    }
    const pickedLocation: PlaceLocation = {
      lat: data.data.lat,
      lng: data.data.lng,
      address: null,
      staticMapImageUrl: null
    };
    this.getAddress(data.data.lat, data.data.lng)
      .pipe(
        switchMap(address => {
          pickedLocation.address = address;
          return of(this.getMapImage(pickedLocation.lat, pickedLocation.lng, 14));
        })
      ).subscribe(staticMapImageUrl => {
        pickedLocation.staticMapImageUrl = staticMapImageUrl;
      });
  }

  private getAddress(lat: number, lng: number): Observable<any> {
    return this._http
      .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.googleMapsAPIkey}`)
      .pipe(
        map((geoData: any) => {
          if (!geoData || !geoData.results || geoData.results.length === 0) {
            return null;
          }
          return geoData.results[0].formatted_address;
        })
      );
  }

  private getMapImage(lat: number, lng: number, zoom: number) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=600x300&maptype=roadmap
    &markers=color:blue%7Clabel:Place%7C${lat},${lng}&key=${environment.googleMapsAPIkey}`;
  }

}
