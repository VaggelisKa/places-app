import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapModalComponent } from '../map-modal/map-modal.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
    this.getAddress(data.data.lat, data.data.lng).subscribe(address => {
      console.log(address);
    });
  }

  private getAddress (lat: number, lng: number): Observable<any> {
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

}
