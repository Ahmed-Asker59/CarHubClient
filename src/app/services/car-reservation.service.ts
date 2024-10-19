import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Client } from '../models/client';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarReservationService   {
  baseUrl = "http://localhost:5151/api/Reservation/";
  
  constructor(public http:HttpClient) { }
 
  

  getReservationFee(id:number){

    return this.http.get<any>(this.baseUrl+'fee/'+id);
  }


  isAllowedToReserve(nationalId:string): Observable<any> {

    return this.http.get<any>(this.baseUrl+'allowedtoreserve/'+nationalId).pipe(
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

  reserveCar(client:Client, carId:number): Observable<any>{
    const params = new HttpParams().set('carId', carId.toString());
    return this.http.post<any>(`${this.baseUrl}reserve?carId=${carId}`, client).pipe(
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
