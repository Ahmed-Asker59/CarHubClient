import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CarService } from '../services/car.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Client } from '../models/client';

@Component({
  selector: 'app-reserve-order',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './reserve-order.component.html',
  styleUrl: './reserve-order.component.scss'
})
export class ReserveOrderComponent implements OnInit{

  carId!:number;
  reservationForm: FormGroup = new FormGroup({});
  client?:Client;


  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }
  
  ngOnInit(): void {
    this.carId = +this.activatedRoute.snapshot.paramMap.get('id')!;
  }

  createForm(){
    this.reservationForm = new FormGroup({
    
        carId: new FormControl(this.carId),
        nationalId: new FormControl(this.client?.nationalId),
        firstName:  new FormControl(this.client?.firstName),
        lastName:  new FormControl(this.client?.lastName),
        address:   new FormControl(this.client?.address),
        email:     new FormControl(this.client?.email),
        phone:  new FormControl(this.client?.phone),
     
    });
  }




  
}
