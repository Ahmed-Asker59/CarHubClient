import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  baseUrl = "http://localhost:5151/api/client/";
  client?:Client;

  constructor(private http:HttpClient) { }

  search(searchQuery:string){

    return this.http.get<Client>(this.baseUrl+`search?nationalId=${searchQuery}`);
  }

  getClientById(id:number){
    return this.http.get<Client>(this.baseUrl+id);
  }
  
  setClient(client:Client){
       this.client = client;
  }
  getClient(){
    return this.client;
  } 
}
