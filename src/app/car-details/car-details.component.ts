import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarService } from '../services/car.service';
import { Car } from '../models/car';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.scss'
})
export class CarDetailsComponent implements OnInit{

  car?:Car;
  CarHubPhoneNumber:string = "01027488227";

  constructor(private carService:CarService, private activatedRoute:ActivatedRoute) {
    
  }
  ngOnInit(): void {
   this.loadCar();
  }
 
  loadCar(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id)
      this.carService.getCar(+id).subscribe({
       next: car => this.car = car,
       error: error => console.log(error) 
    
      })
  }

 
  
}
