import { Component, OnInit, Input } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Place } from 'src/app/places/models/place.model';
import { ModalController } from '@ionic/angular';
import { MapModalComponent } from '../map-modal/map-modal.component';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
  providers: [NgbCarouselConfig]
})
export class ImageCarouselComponent implements OnInit {
  @Input() images: Array<string>;
  @Input() place: Place;

  constructor(private _modalController: ModalController) { }

  ngOnInit() {}

  async onShowMap() {
    const modal = await this._modalController.create({
      component: MapModalComponent,
      componentProps: {
        center: {
          lat: this.place.location.lat,
          lng: this.place.location.lng
        },
        selectable: false,
        title: this.place.title,
        zoom: 15
      }
    });
    await modal.present();
  }

}
