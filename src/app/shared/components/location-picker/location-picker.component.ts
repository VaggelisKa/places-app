import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { MapModalComponent } from '../map-modal/map-modal.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { PlaceLocation } from '../../models/location.model';

import { Plugins, Capacitor } from '@capacitor/core';
import { ControllersService } from '../../services/controllers.service';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {
  selectedLocationImage: string;
  isLoading = false;

  @Output() locationPick = new EventEmitter<PlaceLocation>();

  constructor(private _modalController: ModalController,
              private _http: HttpClient,
              private _actionSheet: ActionSheetController,
              private _controllersService: ControllersService) { }

  ngOnInit() {}

  async onPickLocation() {
    const actionSheet = await this._actionSheet.create({
      header: 'Please Choose',
      buttons: [{
        text: 'Auto-Locate',
        icon: 'navigate-outline',
        handler: () => {
          this.getUserLocation();
        }
      },

      {
        text: 'Manual Pick',
        icon: 'pin-outline',
        handler: () => {
          this.openMap();
        }
      },

      {
        text: 'Cancel',
        icon: 'close-outline',
        role: 'cancel',
      }
    ]
    });
    await actionSheet.present();
  }

  private async openMap() {
    const modal = await this._modalController.create({
      component: MapModalComponent
    });
    await modal.present();

    const data = await modal.onWillDismiss();
    if (!data.data) {
      return;
    }
    const coordinates = {
      latitude: data.data.lat,
      longitude: data.data.lng,
     };
    this.findPlace(coordinates.latitude, coordinates.longitude);
  }

  private findPlace(lat: number, lng: number) {
    const pickedLocation: PlaceLocation = {
      lat: lat,
      lng: lng,
      address: null,
      staticMapImageUrl: null
    };

    this.isLoading = true;
    this.getAddress(lat, lng)
      .pipe(
        switchMap(address => {
          pickedLocation.address = address;
          return of(this.getMapImage(pickedLocation.lat, pickedLocation.lng, 16));
        })
      ).subscribe(staticMapImageUrl => {
        pickedLocation.staticMapImageUrl = staticMapImageUrl;
        this.selectedLocationImage = staticMapImageUrl;
        this.isLoading = false;
        this.locationPick.emit(pickedLocation);
      });
  }

  private getUserLocation() {
    if (!Capacitor.isPluginAvailable('Geolocation')) {
      this._controllersService.errorAlert('Cannot pinpoint your location, use manual pick instead!');
      return;
    }

     Plugins.Geolocation.getCurrentPosition()
       .then(geoPosition => {
         const coordinates = {
           latitude: geoPosition.coords.latitude,
           longitude: geoPosition.coords.longitude,
          };
          this.findPlace(coordinates.latitude, coordinates.longitude);
          this.isLoading = false;
       })
       .catch((_) => {
         this._controllersService.errorAlert('Cannot pinpoint your location, use manual pick instead!');
         this.isLoading = false;
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
