import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { PlacesPage } from './places.page';
import { PlacesRoutingModule } from './places-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromPlaces from './places-store/places.reducer';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PlacesRoutingModule,
    StoreModule.forFeature(fromPlaces.placesFeatureKey, fromPlaces.reducer),
  ],
  declarations: [PlacesPage]
})
export class PlacesPageModule {}
