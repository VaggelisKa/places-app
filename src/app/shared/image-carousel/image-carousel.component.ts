import { Component, OnInit, Input } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Place } from 'src/app/places/models/place.model';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
  providers: [NgbCarouselConfig]
})
export class ImageCarouselComponent implements OnInit {
  @Input() images: Array<string>;
  @Input() place: Place;

  constructor() { }

  ngOnInit() {}

}
