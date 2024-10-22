import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CarService } from '../services/car.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Client } from '../models/client';
import { CarReservationService } from '../services/car-reservation.service';
import Swal from 'sweetalert2';
import { PaymentService } from '../services/payment.service';
import { Car } from '../models/car';
import { loadStripe, Stripe, StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement, StripeElements } from '@stripe/stripe-js';
import { PaymentInfo } from '../models/paymentInfo';




@Component({
  selector: 'app-reserve-order',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './reserve-order.component.html',
  styleUrl: './reserve-order.component.scss'
})
export class ReserveOrderComponent implements OnInit {

  carId!:number;
  reservationFee:number = 0;
  paymentInfo?:PaymentInfo;
  nameOnCard?:String;
  reservationForm: FormGroup = new FormGroup({});
  paymentForm: FormGroup = new FormGroup({});
  client:Client = null!;
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
    private carReservationService:CarReservationService,
    private paymentService:PaymentService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm1();
  }

  
   ngOnInit() :void{
    this.carId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.reservationFee = +this.activatedRoute.snapshot.paramMap.get('reservationFee')!;
    this.carService.getCar(this.carId).subscribe({
      next: car =>  this.car = car,
      error: error => console.log(error) 
   
     });

   
   
  }

  createForm1(){
    this.reservationForm = new FormGroup({
    
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
 
  createForm2(){
    this.paymentForm = new FormGroup({
    

      nameOnCard: new FormControl(this.nameOnCard, [ Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)])
       
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

  submitForm(){
    this.reservationForm.markAllAsTouched();
    if (this.reservationForm.valid) {
      //check if user is allowed to reserve
     
      this.carReservationService.isAllowedToReserve(this.reservationForm.controls['nationalId'].getRawValue()).subscribe({
        next : r => {
          const isAllowed = r?.isAllowed; 
          if(isAllowed){
            this.showForm1 = false;
            this.createForm2();
            setTimeout(() => {
              this.initializeStripe();
            }, 500); 
            this.client = {
              nationalId: this.reservationForm.get('nationalId')?.value,
              firstName: this.reservationForm.get('firstName')?.value,
              lastName: this.reservationForm.get('lastName')?.value,
              address: this.reservationForm.get('address')?.value,
              email: this.reservationForm.get('email')?.value,
              phone: this.reservationForm.get('phone')?.value,
            };

          

     

        
          }
          else{
            this.showErrorMessage(r?.message);
          }
        },

        error: e => this.showErrorMessage(e.message)
      
      })

      //method
    } else {
    
    }
   

  }
 

  showErrorMessage(message:string){
    Swal.fire({
      title: 'sorry!',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  showSuccessMessage(){
    Swal.fire({
      title: 'Car is reserved successfully!',
      text: 'Check your Email for futher Details!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }


  reserveCar(){
    this.carReservationService.reserveCar(this.client , this.carId).subscribe({
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
  submitForm2(){
    this.reservationForm.markAllAsTouched();
    if (this.paymentForm.valid) {
     
    this.isProcessing = true;
    this.paymentService.createPaymentIntent(this.reservationFee).subscribe({
      next : r =>  {
        this.paymentInfo = r;
        this.reserveCar();

      },
      error: e => {
         this.showErrorMessage(e.message),
        this.isProcessing = false;
      }

     })

    }

   
  }
}
