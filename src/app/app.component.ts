import { Component, NgModule, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { OurbrandsComponent } from "./ourbrands/ourbrands.component";
import { FooterComponent } from './footer/footer.component';
import { AccountService } from './services/account.service';
import { authGuard } from './guards/auth.guard';
import {NgxSpinnerModule} from 'ngx-spinner';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, CommonModule, OurbrandsComponent,FooterComponent, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'CarHub';
  private apiUrl = 'http://localhost:5151/api/cars'; 
 
  cars:any[] = []

  constructor(private http:HttpClient, private accountService:AccountService) {
    
    
  }
  ngOnInit(): void {
    
  }
 
  loadCurrentUser(){
    const token = localStorage.getItem('token');
  

    if(token) this.accountService.loadCurrentUser(token).subscribe();
  }


}
