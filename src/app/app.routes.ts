import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactusComponent } from './contactus/contactus.component';
import { CarComponent } from './car/car.component';
import { EnquiryComponent } from './enquiry/enquiry.component';

export const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "about", component: AboutComponent},
    { path: "contactus", component: ContactusComponent },
    { path: "car", component: CarComponent },
    { path: "enquiry", component: EnquiryComponent },

    { path: "", component: HomeComponent }
]
