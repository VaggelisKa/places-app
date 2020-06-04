import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { PlacesPage } from './places.page';
import { PlacesRoutingModule } from './places-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromPlaces from './places-store/places.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PlacesEffects } from './places-store/places.effects';
import { BookingsEffects } from '../bookings/bookings-store/bookings.effects';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PlacesRoutingModule,
    StoreModule.forFeature(fromPlaces.placesFeatureKey, fromPlaces.reducer),
    EffectsModule.forFeature([PlacesEffects])
  ],
  declarations: [PlacesPage]
})
export class PlacesPageModule {}
