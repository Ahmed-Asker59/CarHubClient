import { Component } from '@angular/core';
import { Car } from '../models/car';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Client } from '../models/client';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarService } from '../services/car.service';
import { CommonModule } from '@angular/common';
import { CarReservationService } from '../services/car-reservation.service';
import Swal from 'sweetalert2';
import { CarRentalService } from '../services/car-rental-service.service';

@Component({
  selector: 'app-rent-order',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './rent-order.component.html',
  styleUrl: './rent-order.component.scss'
})
export class RentOrderComponent {
  carId!:number;
  rentalFeePerDay:number = 0;
  rentalDays:number = 1;
  rentalForm: FormGroup = new FormGroup({});
  client?:Client;
  showForm1: boolean = true;
  isAllowed:boolean = true;

  constructor(
    private carService: CarService,
    private carRentalService:CarRentalService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }


  ngOnInit(): void {
    this.carId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.rentalFeePerDay = +this.activatedRoute.snapshot.paramMap.get('rentalfeeperday')!;
   
  }

  createForm(){
    this.rentalForm = new FormGroup({
    
        carId: new FormControl(this.carId),
        nationalId: new FormControl(this.client?.nationalId, [ Validators.required,
                    Validators.pattern('^[0-9]{14}$') ]),
        firstName:  new FormControl(this.client?.firstName, [
          Validators.required,
          Validators.minLength(2)]),
        lastName:  new FormControl(this.client?.lastName, [
          Validators.required,
          Validators.minLength(2)
        ]),
        address:   new FormControl(this.client?.address, Validators.required),
        email:     new FormControl(this.client?.email, [
          Validators.required,
          Validators.email]),
        phone:  new FormControl(this.client?.phone, [
          Validators.required,
          Validators.pattern(/^\d{10,15}$/)
        ]),
     
    });
  }



  submitForm(){
    this.rentalForm.markAllAsTouched();
    if (this.rentalForm.valid) {
      //check if user is allowed to reserve
     
      this.carRentalService.isAllowedToRent(this.rentalForm.controls['nationalId'].getRawValue()).subscribe({
        next : r => {
          const isAllowed = r?.isAllowed; 
          if(isAllowed){
            this.showForm1 = false;
            this.client = {
              nationalId: this.rentalForm.get('nationalId')?.value,
              firstName: this.rentalForm.get('firstName')?.value,
              lastName: this.rentalForm.get('lastName')?.value,
              address: this.rentalForm.get('address')?.value,
              email: this.rentalForm.get('email')?.value,
              phone: this.rentalForm.get('phone')?.value,
            };

            this.carRentalService.rentCar(this.client, this.carId, this.rentalDays).subscribe({
              next: r => {
                if(r?.isAllowed)
                   this.showSuccessMessage();
                else
                  this.showErrorMessage(r?.message);
              },
              error: e => console.log(e)
            });
          }

          else{
            this.showErrorMessage(r?.message);
          }
        },

        error: e => console.log(e)
      
      })

      //if form is not valid
    } else {
         
    }
   

  }

  showErrorMessage(message:string){
    Swal.fire({
      title: 'Sorry',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  showSuccessMessage(){
    Swal.fire({
      title: 'Car is rented successfully!',
      text: 'Check your Email for futher Details!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

    


}
