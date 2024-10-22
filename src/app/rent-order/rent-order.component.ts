import { Component, ElementRef, ViewChild } from '@angular/core';
import { Car } from '../models/car';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Client } from '../models/client';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarService } from '../services/car.service';
import { CommonModule } from '@angular/common';
import { CarReservationService } from '../services/car-reservation.service';
import Swal from 'sweetalert2';
import { CarRentalService } from '../services/car-rental-service.service';
import { PaymentInfo } from '../models/paymentInfo';
import { loadStripe, Stripe, StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement } from '@stripe/stripe-js';
import { PaymentService } from '../services/payment.service';

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
  totalRentalFee =0;
  rentalDays:number = 1;
  paymentInfo?:PaymentInfo;
  nameOnCard?:String;
  rentalForm: FormGroup = new FormGroup({});
  paymentForm: FormGroup = new FormGroup({});
  client?:Client;
  showForm1: boolean = true;
  isAllowed:boolean = true;
  isProcessing:boolean = false;
  car?:Car;
  @ViewChild('cardNumber') cardNumberElement?:ElementRef;
  @ViewChild('cardExpiry') cardExpiryElement?:ElementRef;
  @ViewChild('cardCvc') cardCvcElement?:ElementRef;
  stripe:Stripe|null = null;
  cardNumber?:StripeCardNumberElement;
  cardExpiry?:StripeCardExpiryElement;
  cardCvc?:StripeCardCvcElement;
  cardErrors:any;

  constructor(
    private carService: CarService,
    private carRentalService:CarRentalService,
    private paymentService:PaymentService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm1();
  }


  ngOnInit(): void {
    this.carId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.rentalFeePerDay = +this.activatedRoute.snapshot.paramMap.get('rentalfeeperday')!;
    this.carService.getCar(this.carId).subscribe({
      next: car =>  this.car = car,
      error: error => console.log(error) 
   
     });
   
  }

  createForm1(){
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
        rentalDays: new FormControl(this.rentalDays, [Validators.required, Validators.min(1), Validators.max(30)])
     
    });
  }

  createForm2(){
    this.paymentForm = new FormGroup({
    

        nameOnCard: new FormControl(this.nameOnCard, [ Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]),
       
    });
  }

  initializeStripe(){
    loadStripe('pk_test_51Q9qm7P42CHHXtjtzpX3TvmE0E8O7aacQc34dMiXwl65oI5kGCZiqrGAOc3kfbkRR3iMNKXLlAL7hWgBb5K7WqDh00UTqp5LAH')
    .then(
    stripe => {
     this.stripe = stripe;
     const elements = stripe?.elements();

     const baseStyle = {
       base: {
         fontSize: '16px',   // Set your own styling here
         color: '#000',       // Default text color (black)
         backgroundColor: 'transparent',  // Transparent background
         iconColor: '#000',   // Control the icon color (e.g., card icons)
         '::placeholder': {
           color: '',  // Placeholder text color
         },
     
       },
     };
   

     if(elements){

 
         this.cardNumber =  elements.create('cardNumber',  { style: baseStyle });
         this.cardNumber.mount(this.cardNumberElement?.nativeElement);
         this.cardNumber.on('change', event => {
            if(event.error) this.cardErrors = event.error.message;
            else this.cardErrors = null;
         });
 
         this.cardExpiry =  elements.create('cardExpiry',  { style: baseStyle });
         this.cardExpiry.mount(this.cardExpiryElement?.nativeElement);
         this.cardExpiry.on('change', event => {
           if(event.error) this.cardErrors = event.error.message;
           else this.cardErrors = null;
        });

 
         this.cardCvc =  elements.create('cardCvc',  { style: baseStyle });
         this.cardCvc.mount(this.cardCvcElement?.nativeElement );
         this.cardCvc.on('change', event => {
           if(event.error) this.cardErrors = event.error.message;
           else this.cardErrors = null;
        });

 
      

      }
    }
    )
  }
  submitForm1(){
    this.rentalForm.markAllAsTouched();
    if (this.rentalForm.valid) {
      //check if user is allowed to reserve
     
      this.carRentalService.isAllowedToRent(this.rentalForm.controls['nationalId'].getRawValue()).subscribe({
        next : r => {
          const isAllowed = r?.isAllowed; 
          if(isAllowed){
            this.showForm1 = false;
            this.createForm2();
            setTimeout(() => {
              this.initializeStripe();
            }, 500); 
            this.client = {
              nationalId: this.rentalForm.get('nationalId')?.value,
              firstName: this.rentalForm.get('firstName')?.value,
              lastName: this.rentalForm.get('lastName')?.value,
              address: this.rentalForm.get('address')?.value,
              email: this.rentalForm.get('email')?.value,
              phone: this.rentalForm.get('phone')?.value,
            };
            
            this.totalRentalFee = this.rentalFeePerDay * this.rentalDays;
          
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

  submitForm2(){
    this.rentalForm.markAllAsTouched();
    if (this.paymentForm.valid) {
      this.isProcessing = true;
    this.paymentService.createPaymentIntent(this.rentalFeePerDay).subscribe({
      next : r =>  {
        this.paymentInfo = r;
        this.rentCar();
 

      },
      error:  e => {
         this.showErrorMessage(e.message),
        this.isProcessing = false;
      }

     })

    }
  }

  rentCar(){
    this.carRentalService.rentCar(this.client!, this.carId, this.rentalDays).subscribe({
      next: r => {
        if(r?.isAllowed){
          this.stripe?.confirmCardPayment(this.paymentInfo!.clientSecret, {
           payment_method:{
             card: this.cardNumber!,
             billing_details: {
               name: this.paymentForm.get('nameOnCard')?.value
             }

           }
          }).then(result => {
           if(result.paymentIntent){
             this.showSuccessMessage();
             this.router.navigate(['car']);
           }
          })
          
       }
       else
       this.showErrorMessage(r?.message);
      },
      error: e => console.log(e)
    });
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
