import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class CarRentalService {
  
  baseUrl = "http://localhost:5151/api/Rental/";

  constructor(public http:HttpClient) { }

  
  isAllowedToRent(nationalId:string): Observable<any> {

    return this.http.get<any>(this.baseUrl+'isallowedtorent/'+nationalId).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage: string;
  
        // Check if the error response has a message field
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else {
          errorMessage = 'An unknown error occurred';
        }
  
        return throwError(() => new Error(errorMessage)); // Throw an error to be caught in the component
      })
    );
    
  }
 

  rentCar(client:Client, carId:number, rentalDays:number): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}rent?carId=${carId}&rentalDays=${rentalDays}`, client).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage: string;

        // Check if the error response has a message field
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else {
          errorMessage = 'An unknown error occurred';
        }

        return throwError(() => new Error(errorMessage));
      })
    );
    
  }


  
}
