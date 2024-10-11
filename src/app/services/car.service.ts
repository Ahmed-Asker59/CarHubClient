import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Car } from '../models/car';
import { Brand } from '../models/brand';
import { Type } from '../models/type';
import { carParams } from '../models/carParams';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(public http:HttpClient) { }

  baseUrl = "http://localhost:5151/api/"

  getCars(carParams: carParams){
    let params = new HttpParams();
    if(carParams.brandId) params = params.append("brandId",carParams.brandId);
    if(carParams.typeId) params=params.append("typeId",carParams.typeId);
    if(carParams.sort) params = params.append("sort",carParams.sort)
    return this.http.get<Car[]>(this.baseUrl+"cars",{params:params});
  }

  getbrands(){
    return this.http.get<Brand[]>(this.baseUrl+"cars/brands")
  }

  gettypes(){
    return this.http.get<Type[]>(this.baseUrl+"cars/types")

  }


}
