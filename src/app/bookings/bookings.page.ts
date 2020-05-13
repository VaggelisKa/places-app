import { Component, OnInit } from '@angular/core';
import { BookingsService } from './services/bookings.service';
import { Booking } from './models/booking.model';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  bookings: Booking[];

  constructor(private _bookingsService: BookingsService) { }

  ngOnInit() {
    this.bookings = this._bookingsService.getBookings();
  }

  onDelete(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
  }

}
