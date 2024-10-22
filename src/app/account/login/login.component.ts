import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { error } from 'console';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  constructor(private accountService:AccountService, private router:Router, private activatedRoute:ActivatedRoute) {
    
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || 'dashboard';

  }
 
  returnUrl:string = "";
  loginForm = new FormGroup({
   email: new FormControl('',Validators.required),
   password: new FormControl('',Validators.required)
  });
  ngOnInit(): void {

  }


  onSubmit(){
    this.accountService.login(this.loginForm.value).subscribe({
      next : user => this.router.navigateByUrl(this.returnUrl),
      error: e => console.log(e)
    })
  
  }

}
