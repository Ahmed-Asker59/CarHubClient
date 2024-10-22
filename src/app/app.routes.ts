import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactusComponent } from './contactus/contactus.component';
import { CarComponent } from './car/car.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { MercedesComponent } from './mercedes/mercedes.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { ReserveOrderComponent } from './reserve-order/reserve-order.component';
import { RentOrderComponent } from './rent-order/rent-order.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportsComponent } from './reports/reports.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "home", component: HomeComponent },   
    { path: "about", component: AboutComponent},
    { path: "contactus", component: ContactusComponent },
    { path: "car", component: CarComponent },
    { path: "enquiry", component: EnquiryComponent },
    {path:"mercedes",component:MercedesComponent},
    {path:"details/:id", component:CarDetailsComponent},
    {path:"reserve/:id/:reservationFee", component:ReserveOrderComponent},
    {path:"rent/:id/:rentalfeeperday", component: RentOrderComponent},
    {path:"login", component: LoginComponent},
    {path:"register", component: RegisterComponent},
    {path:"dashboard", component: DashboardComponent},
    {path:"dashboard/reports", component: ReportsComponent},
       
   



    
]
