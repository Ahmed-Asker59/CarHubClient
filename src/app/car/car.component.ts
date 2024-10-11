import { Component, ElementRef, model, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../services/car.service';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { carParams } from '../models/carParams';
import { Pagination } from '../models/paging';
import { FilterOptions } from '../models/FilterOptions';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [CommonModule, PaginationModule, FormsModule],
  templateUrl: './car.component.html',
  styleUrl: './car.component.scss'
})
export class CarComponent implements OnInit {

  constructor(public carservice: CarService) {}

  @ViewChild('search')
  searchTerms!: ElementRef;
  cars: Pagination = new Pagination();

  @ViewChild('All')
  all!:ElementRef

  sortedOptions = [
    { name: "Alphabetical", value: 'nameAsc' },
    { name: 'Price : Low to High', value: 'priceAsc' },
    { name: 'Price : High to Low', value: 'priceDesc' },
    { name: 'Age : Newest First', value: 'ManufactureYearAsc' },
    { name: 'Age : Oldest First', value: 'ManufactureYearDesc' },
    { name: 'Mileage : Low to High', value: 'MileageAsc' },
    { name: 'Mileage : High to Low', value: 'MileageDesc' }
  ];

  

  

  flag:boolean = false;
  totalcount: number = 0;
  carparams: carParams = new carParams();
  carlist:any;

  ngOnInit(): void {
    this.getCars();
  }

  getCars() {
    
  this.carservice.getCars(this.carparams).subscribe({
    next: (response) => {
      
      this.cars.data = response.data;
      this.carlist = this.cars.data;
      this.totalcount = response.count;
    },
    error: (e) => console.error('Error fetching cars:', e),
    complete: () => console.log('Car data fetching complete.')
  });
}
  

  onSortSelected(event: any) {
    const selectedSort = event.target.value;
    if (selectedSort.includes('Asc')) {
      this.carparams.sortBy = selectedSort.replace('Asc', '');
      this.carparams.sortDirection = 'asc';
    } 
    else if (selectedSort.includes('Desc')) {
      this.carparams.sortBy = selectedSort.replace('Desc', '');
      this.carparams.sortDirection = 'desc';
    }
    this.getCars();
  }

 
  resetFilters() {
    if(this.searchTerms) 
      this.searchTerms.nativeElement.value=""
    this.carparams = new carParams(); // Reset to default values
    this.getCars(); // Fetch cars with default parameters
  }

 pageChanged(event: PageChangedEvent) {
    this.carparams.PageIndex = event.page;  // Update the current page index
    this.getCars();  // Fetch data for the updated page
}
onSearch(){
  this.carparams.SearchValue = this.searchTerms.nativeElement.value;
  this.getCars();
}

  
}
