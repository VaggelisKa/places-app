import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      NgbModule
    ],
    exports: [
      ImageCarouselComponent
    ],
    declarations: [ImageCarouselComponent]
})
export class SharedModule {}
