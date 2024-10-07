import { Component } from '@angular/core';
import { OurbrandsComponent } from '../ourbrands/ourbrands.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [OurbrandsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
