import { Component, OnInit, Input} from '@angular/core';
import { Place } from 'src/app/places/models/place.model';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;

  private maxYear: string;
  private currentDate: string;
  private minAvailableTo: string;
  private chosenCheckinDate;

  constructor(private _modalController: ModalController) { }

  ngOnInit() {
    this.maxYear = (new Date().getFullYear() + 1).toString();
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

    const nextDay = new Date().getDate() + 1;
    this.minAvailableTo = formatDate(new Date(), `yyyy-MM-${nextDay}`, 'en');

  }

  onClose(): void {
    this._modalController.dismiss(null, 'cancel');
  }

  onConfirm(form: NgForm): void {
    console.log(form.value);
    this._modalController.dismiss({message: 'dummy'}, 'Confirm');
  }

}
