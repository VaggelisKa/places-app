import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { LoadingAnimationComponent } from './loading-animation/loading-animation.component';
import { LocationPickerComponent } from './location-picker/location-picker.component';
import { MapModalComponent } from './map-modal/map-modal.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      NgbModule
    ],
    exports: [
      ImageCarouselComponent,
      LoadingAnimationComponent,
      LocationPickerComponent,
      MapModalComponent
    ],
    declarations: [
      ImageCarouselComponent,
      LoadingAnimationComponent,
      LocationPickerComponent,
      MapModalComponent
    ]
})
export class SharedModule {}
