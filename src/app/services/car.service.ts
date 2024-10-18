import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { carParams } from '../models/carParams';
import { Pagination } from '../models/paging';
import { Observable } from 'rxjs';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(public http:HttpClient) { }

  baseUrl = "http://localhost:5151/api/";

  getCars(carParams: carParams): Observable<Pagination>{
    let params = new HttpParams();
    if(carParams.sortBy) params = params.append("sortBy",carParams.sortBy)
    if(carParams.sortDirection) params = params.append("sortDirection",carParams.sortDirection)
    if(carParams.color) params = params.append("color",carParams.color)
    if(carParams.fuel) params = params.append("fuel",carParams.fuel.toString())
    if(carParams.makeId) params = params.append("makeId",carParams.makeId)
    if(carParams.modelId) params = params.append("modelId",carParams.modelId)
    if(carParams.modelVariant) params = params.append("modelVariant",carParams.modelVariant)
    if(carParams.mileageFrom) params = params.append("mileageFrom",carParams.mileageFrom)
    if(carParams.mileageTo) params = params.append("mileageTo",carParams.mileageTo)
    if(carParams.priceFrom) params = params.append("priceFrom",carParams.priceFrom)
    if(carParams.priceTo) params = params.append("priceTo",carParams.priceTo)
    if(carParams.PageIndex) params = params.append("PageIndex",carParams.PageIndex)
    if(carParams._pageSize) params = params.append("_pageSize",carParams._pageSize)
    if(carParams.carCondition) params = params.append("carCondition",carParams.carCondition)
    if(carParams.SearchValue) params = params.append("SearchValue",carParams.SearchValue)
    if(carParams.transmission) params = params.append("transmission",carParams.transmission)
    return this.http.get<Pagination>(this.baseUrl+'cars',{params:params});
  }


  getCar(id:number){

    return this.http.get<Car>(this.baseUrl+'cars/'+id);
  }

  




}
