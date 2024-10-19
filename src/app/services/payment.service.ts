import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentInfo } from '../models/paymentInfo';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseUrl = "http://localhost:5151/api/Payment/";
  
  constructor(public http:HttpClient) { }



  createPaymentIntent(totalPrice:number): Observable<PaymentInfo>{
     return this.http.post<PaymentInfo>(this.baseUrl+totalPrice, {}).pipe(
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
}
