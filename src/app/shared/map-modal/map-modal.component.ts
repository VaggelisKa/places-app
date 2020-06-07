import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ControllersService } from '../services/controllers.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('map') mapElement: ElementRef;

  private readonly path = 'https://maps.googleapis.com/maps/api/js?key=' + environment.googleMapsAPIkey;
  clickListener: any;
  googleMaps: any;

  constructor(private _modalController: ModalController,
              private _controllersService: ControllersService,
              private _renderer: Renderer2) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.getGoogleMaps()
      .then(googleMaps => {
        this.googleMaps = googleMaps;
        const mapEl = this.mapElement.nativeElement;
        const map = new googleMaps.Map(mapEl, {
          center: { lat: 40, lng: 22 },
          zoom: 4
        });

        this.googleMaps.event.addListenerOnce(map, 'idle', () => {
          this._renderer.addClass(mapEl, 'visible');
        });

        this.clickListener = map.addListener('click', event => {
          const selectedCoords = {lat: event.latLng.lat(), lng: event.latLng.lng()};
          this._modalController.dismiss(selectedCoords);
        });
      })
      .catch(err => {
        this._controllersService.errorAlert(err);
      });
  }

  onCancel() {
    this._modalController.dismiss();
  }

  private getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = this.path;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google maps SDK not available!');
        }
      };
    });
  }

  ngOnDestroy() {
    this.googleMaps.event.removeListener(this.clickListener);
  }

}
