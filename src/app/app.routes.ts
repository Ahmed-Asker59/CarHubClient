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
<<<<<<< HEAD
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportsComponent } from './reports/reports.component';
=======
import { authGuard } from './guards/auth.guard';
import { ClientSearchComponent } from './client/client-search/client-search.component';
import { ClientDetailsComponent } from './client/client-details/client-details.component';
>>>>>>> 95852859b61650214743abd400b0a50c321717b6

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
<<<<<<< HEAD
    {path:"dashboard", component: DashboardComponent},
    {path:"dashboard/reports", component: ReportsComponent},
       
   
=======

    {path:"searchclients",component: ClientSearchComponent},
    {path:"clientdetails/:id", component:ClientDetailsComponent}
>>>>>>> 95852859b61650214743abd400b0a50c321717b6



    
]
