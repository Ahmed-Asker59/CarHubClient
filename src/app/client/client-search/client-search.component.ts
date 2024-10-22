import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-client-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './client-search.component.html',
  styleUrl: './client-search.component.scss'
})
export class ClientSearchComponent {

  searchForm: FormGroup = new FormGroup({

    searchQuery: new FormControl('',Validators.required),
  
  });

  client:Client | null = null;
  hasSearched:boolean= false;

    constructor(private clientService:ClientService, private router: Router) {
    
      
    }



    search(searchQuery:string){
      
      this.client = null;
      this.clientService.search(searchQuery).subscribe({
        next : c => {
          if(c)
             this.client = c;
          
        },
        error : e => {
          
        }
      })
    }

    submitForm(){
      this.searchForm.markAllAsTouched();
      if (this.searchForm.valid) {
       
        this.hasSearched = true;
        this.search(this.searchForm.controls['searchQuery'].getRawValue());
  
      }
    }


    goToDetails(){
      this.clientService.setClient(this.client!);
      this.router.navigate(['/clientdetails']);
    }
      
}
