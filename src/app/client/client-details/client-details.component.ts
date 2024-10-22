import { Component, Input, input } from '@angular/core';
import { Client } from '../../models/client';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.scss'
})
export class ClientDetailsComponent {
   
  id:number = 0;
  client?:Client;
  constructor(private route: ActivatedRoute, private router: Router,private clientService:ClientService) {
    
  }
  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
   this.clientService.getClientById(this.id).subscribe({
    next: c => this.client = c,
    error: e => console.log(e)
   })
  }



}
