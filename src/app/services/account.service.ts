import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "http://localhost:5151/api/Account/";
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router:Router)
   {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        this.loadCurrentUser(token).subscribe(); // Subscribe to load the user
      }
    }
    
  }

  loadCurrentUser(token:string){
   let headers = new HttpHeaders();
   headers = headers.set('Authorization',`Bearer ${token}`);
   return this.http.get<User>(this.baseUrl, {headers}).pipe(

    map(user => {
      localStorage.setItem('token',user.token);
      this.currentUserSource.next(user);
      console.log(localStorage.getItem('token'))
    })

   )



  }


  register(values:any){
    this.http.post<User>(this.baseUrl+'register',values).pipe(
      map(user => {
        localStorage.setItem('token',user.token);
        this.currentUserSource.next(user);
      })
    )
  }


  
  login(values:any){
    return this.http.post<User>(this.baseUrl + 'login', values).pipe(
      map(user => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
        return user;
      })
    );
  }


  logout(){
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('');
  }


  checkEmailExists(email:string){
    return this.http.get<boolean>(this.baseUrl+'emailexists?email='+ email);
  }


}
