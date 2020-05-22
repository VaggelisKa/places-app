import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BookingsPage } from './bookings.page';
import { CreateBookingComponent } from './create-booking/create-booking.component';

import { StoreModule } from '@ngrx/store';
import * as fromBookings from './bookings-store/bookings.reducer';

const routes: Routes = [
  {
    path: '',
    component: BookingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromBookings.bookingsFeatureKey, fromBookings.reducer)
  ],
  declarations: [BookingsPage, CreateBookingComponent]
})
export class BookingsPageModule {}
