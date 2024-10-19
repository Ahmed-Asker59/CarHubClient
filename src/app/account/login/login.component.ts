import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { error } from 'console';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  constructor(private accountService:AccountService, private router:Router) {
    
    
  }

  loginForm = new FormGroup({
   email: new FormControl('',Validators.required),
   password: new FormControl('',Validators.required)
  });
  ngOnInit(): void {

  }


  onSubmit(){
    this.accountService.login(this.loginForm.value).subscribe({
      next : user => this.router.navigateByUrl('car'),
      error: e => console.log(e)
    })
  
  }

}
