import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  private currentDate: string;
  private maxYear: string;

  // Second date picker
  private minAvailableTo: string;

  constructor() { }

  ngOnInit(): void {
    this.maxYear = (new Date().getFullYear() + 4).toString();
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

    const nextDay = new Date().getDate() + 1;
    this.minAvailableTo = formatDate(new Date(), `yyyy-MM-${nextDay}`, 'en');
  }

  onCreateOffer() {
    console.log('offer created');
  }

}
