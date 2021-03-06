import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCarouselComponent } from './components/image-carousel/image-carousel.component';
import { LoadingAnimationComponent } from './components/loading-animation/loading-animation.component';
import { LocationPickerComponent } from './components/location-picker/location-picker.component';
import { MapModalComponent } from './components/map-modal/map-modal.component';
import { ImagePickerComponent } from './components/image-picker/image-picker.component';

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
      MapModalComponent,
      ImagePickerComponent
    ],
    declarations: [
      ImageCarouselComponent,
      LoadingAnimationComponent,
      LocationPickerComponent,
      MapModalComponent,
      ImagePickerComponent
    ]
})
export class SharedModule {}
