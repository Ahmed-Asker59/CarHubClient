import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../services/car.service';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { carParams } from '../models/carParams';
import { Pagination } from '../models/paging';

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

  sortedOptions = [
    { name: "Alphabetical", value: 'nameAsc' },
    { name: 'Price : Low to High', value: 'priceAsc' },
    { name: 'Price : High to Low', value: 'priceDesc' },
    { name: 'Age : Newest First', value: 'ManufactureYearAsc' },
    { name: 'Age : Oldest First', value: 'ManufactureYearDesc' },
    { name: 'Mileage : Low to High', value: 'MileageAsc' },
    { name: 'Mileage : High to Low', value: 'MileageDesc' }
  ];

  totalcount: number = 0;
  carparams: carParams = new carParams();

  ngOnInit(): void {
    this.getCars();
  }

  getCars() {
    console.log('Fetching cars with the following params:', this.carparams); // Check carparams before making the API call
    this.carservice.getCars(this.carparams).subscribe({
      next: (response) => {
        this.cars = response;
        console.log('Response:', response);  // Check what response is being returned
        this.carparams.PageIndex = response.pageIndex;  // Ensure PageIndex is being set correctly
        this.carparams._pageSize = response.pageSize;
        this.totalcount = response.count;
        console.log('Total count:', this.totalcount);
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
