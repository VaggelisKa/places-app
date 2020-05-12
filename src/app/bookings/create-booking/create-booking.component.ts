import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/places/models/place.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;

  constructor(private _modalController: ModalController) { }

  ngOnInit() {}

  onClose(): void {
    this._modalController.dismiss(null, 'cancel');
  }

  onConfirm(): void {
    this._modalController.dismiss({message: 'dummy'}, 'Confirm');
  }

}
