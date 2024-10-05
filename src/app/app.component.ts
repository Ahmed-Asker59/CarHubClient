import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavBarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'CarHub';
  private apiUrl = 'http://localhost:5151/api/cars'; 
 
  cars:any[] = []

  constructor(private http:HttpClient) {
    
    
  }
  ngOnInit(): void {

    this.http.get(this.apiUrl).subscribe({
      next: (response:any) =>  console.log(response),
      error: (error) => console.log(error),
      complete: () => {
        console.log("Request completed")
      }
    })
    
  }



}
