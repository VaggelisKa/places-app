import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { catchError, map, switchMap, take } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

interface BookingData {
    dateFrom: string;
    dateTo: string;
    firstName: string;
    guestNumber: string;
    lastName: string;
    placeId: string;
    placeTitle: string;
    userId: string;
}

@Injectable({providedIn: 'root'})
export class BookingsService {
    private readonly path = environment.firebaseUrl + 'bookings';

    constructor(private _http: HttpClient,
                private _authService: AuthService) {}

    fetchBookings(): Observable<any> {
        return this._authService.getUserToken().pipe(take(1), switchMap(token => {
            return this._authService.getUserId().pipe(
                switchMap(userId => {
                    if (!userId) {
                        throw new Error('User not found!');
                    }
    
                    return this._http
                        .get<{[key: string]: BookingData}>(this.path + `.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`);
                }), 
                map(bookingData => {
                    const bookings: Booking[] = [];
                    for (const key in bookingData) {
                        if (bookingData.hasOwnProperty(key)) {
                            bookings.push({
                                id: key,
                                placeId: bookingData[key].placeId,
                                userId: bookingData[key].userId,
                                placeTitle: bookingData[key].placeTitle,
                                firstName: bookingData[key].firstName,
                                lastName: bookingData[key].lastName,
                                guestNumber: +bookingData[key].guestNumber,
                                dateFrom: new Date(bookingData[key].dateFrom),
                                dateTo: new Date(bookingData[key].dateTo)
                            });
                        }
                    }
                    return bookings;
                }), catchError((err: HttpErrorResponse) => throwError('Error Code: ' + err.status + ' with text: ' + err.statusText))
            );
        }));
    }

    addBooking(newBooking: Booking): Observable<any> {
        return this._authService.getUserToken().pipe(take(1), switchMap(token => {
            return this._http
                .post<{name: string}>(this.path + `.json?auth=${token}`, newBooking)
                .pipe(catchError((err: HttpErrorResponse) => throwError('Error Code: ' + err.status + ' with text: ' + err.statusText)));
        }));
    }

    deleteBooking (id: string) {
        return this._authService.getUserToken().pipe(take(1), switchMap(token => {
            return this._http
            .delete(`${this.path}/${id}.json?auth=${token}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError('Error Code: ' + err.status + ' with text: ' + err.statusText)));
        }));
    }
}
