import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '../services/account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  constructor(public accountService:AccountService) {
     
  }
}
