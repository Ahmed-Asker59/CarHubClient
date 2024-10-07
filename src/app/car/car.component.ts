import { Component, OnInit } from '@angular/core';
import { Car } from '../models/car';
import { CommonModule } from '@angular/common';
import { Brand } from '../models/brand';
import { Type } from '../models/type';
import { CarService } from '../services/car.service';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { carParams } from '../models/carParams';

  @Component({
    selector: 'app-car',
    standalone: true,
    imports: [CommonModule,PaginationModule,FormsModule],
    templateUrl: './car.component.html',
    styleUrl: './car.component.scss'
  })
  export class CarComponent implements OnInit{

    constructor(public carservice:CarService){}

    cars:Car[] = []
    brands:Brand[]=[]
    types:Type[]=[]

    carparams:carParams=new carParams();

    sortedOptios=[
      {name:"Alphabetical",value:'name'},
      {name:'Price : Low to High', value:'priceAsc'},
      {name:'Price : High to Low', value:'priceDesc'}
    ]
    totalItems = 64;
    currentPage = 4;
    smallnumPages = 0;
   
    pageChanged(event: PageChangedEvent): void {
      console.log('Page changed to: ' + event.page);
      console.log('Number items per page: ' + event.itemsPerPage);
    }

    ngOnInit(): void {
      this.getCars();
      this.getBrands();
      this.getTypes();
    }

    getCars()
    {
      
      this.carservice.getCars(this.carparams).subscribe({
        next: (response) => {
          this.cars = response
        },
        error: (e) => console.error('Error fetching cars:', e),
        complete: () => console.log('Data fetching complete')
      });
    }

    getBrands(){
      this.carservice.getbrands().subscribe({
        next: (response) => {
          this.brands = [{id:0,name:'All'},...response]; 
        },
        error: (e) => console.error('Error fetching cars:', e),
        complete: () => console.log('Data  fetching complete')
      });
    }

    getTypes(){
      this.carservice.gettypes().subscribe({
        next: (response) => {
          this.types = [{id:0,name:'All'},...response]; 
          console.log(response)
        },
        error: (e) => console.error('Error fetching cars:', e),
        complete: () => console.log('Data  fetching complete')
      });
    }

    onBrandSelected(brandId:number){

      this.carparams.brandId = brandId;
      this.getCars();

    }
    onTypeSelected(typeId:number){

      this.carparams.typeId = typeId;
      this.getCars();

    }

    onSortSelected(event:any){
      this.carparams.sort = event.target.value;
      this.getCars();
    }

  }
