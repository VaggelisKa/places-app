import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BookingsPage } from './bookings.page';
import { EffectsModule } from '@ngrx/effects';
import { BookingsEffects } from './bookings-store/bookings.effects';

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
    EffectsModule.forFeature([BookingsEffects])
  ],
  declarations: [BookingsPage]
})
export class BookingsPageModule {}
