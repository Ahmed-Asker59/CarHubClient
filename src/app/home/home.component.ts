import { Component } from '@angular/core';
import { OurbrandsComponent } from '../ourbrands/ourbrands.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [OurbrandsComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
