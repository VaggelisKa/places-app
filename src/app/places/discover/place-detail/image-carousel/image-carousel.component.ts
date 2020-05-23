import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
  providers: [NgbCarouselConfig]
})
export class ImageCarouselComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
