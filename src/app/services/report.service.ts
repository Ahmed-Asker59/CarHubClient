import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RentalDto } from '../models/RentalDTO';
import { DelayedRentalDTO } from '../models/DelayedRentalDTO';
import { ReservationDTO } from '../models/ReservationDTO';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(public http:HttpClient) { }

  baseUrl = "http://localhost:5151/api/Report/";

  getRentals(dateFrom: string | null, dateTo: string | null): Observable<RentalDto[]> {
    let params = new HttpParams();
    
    if (dateFrom) {
      params = params.append('dateFrom', dateFrom);
    }
    
    if (dateTo) {
      params = params.append('dateTo', dateTo);
    }
    
    return this.http.get<RentalDto[]>(`${this.baseUrl}rentals`, { params });
  }
  getDelayedRentals(){
    return this.http.get<DelayedRentalDTO[]>(this.baseUrl+'delayedrentals');
  }
  getReservation(){
    return this.http.get<ReservationDTO[]>(this.baseUrl+'reservations');
 }



}