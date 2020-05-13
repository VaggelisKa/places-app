import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';

@Injectable({providedIn: 'root'})
export class BookingsService {
    private bookings: Booking[] = [
        {
            id: 'ohafhusdoad',
            placeId: 'p1',
            userId: 'ioijfdjkfdj',
            placeTitle: 'New york mansion',
            guestNumber: 7
        },

        {
            id: 'oopsaospaosp',
            placeId: 'p2',
            userId: 'ioijfdjkfdsasaj',
            placeTitle: 'Greek bangalow',
            guestNumber: 3
        }
    ];

    getBookings(): Booking[] {
        return [...this.bookings];
    }
}
