import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Place } from '../../models/place.model';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss'],
})
export class OfferItemComponent implements OnInit {
  @Input() offer: Place;

  constructor() {}

  ngOnInit() {}
}
