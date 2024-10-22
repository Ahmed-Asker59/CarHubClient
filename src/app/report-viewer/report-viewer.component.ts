import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../services/report.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { RentalDto } from '../models/RentalDTO';
import { DelayedRentalDTO } from '../models/DelayedRentalDTO';
import { ReservationDTO } from '../models/ReservationDTO';
import {FormsModule} from '@angular/forms';
import Swal from 'sweetalert2';
import { CacheService } from '../services/cacheservice.service';



@Component({
  selector: 'app-report-viewer',
  standalone: true,
  imports: [CommonModule, 
    RouterModule,FormsModule
  ],
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.scss']
})
export class ReportViewerComponent implements OnInit {
  rentals: RentalDto[] = [];
  delayedRentals: DelayedRentalDTO[] = [];
  reservations: ReservationDTO[] = [];
  selectedReport: string = '';
  dateFrom:string='';
  dateTo:string=''
  hasFetchedRentals = false;

  constructor(private reportsService: ReportsService, 
    private route: ActivatedRoute, 
    private router: Router ) {}

  ngOnInit(): void {


    this.route.queryParams.subscribe(params => {
      if (params['type']) {
        this.selectedReport = params['type'];
        this.fetchData(this.selectedReport);
        console.log(this.selectedReport);
      }
    });
  }

  
  fetchData(reportType: string) {
    switch (reportType) {
      case 'Rentals':
        this.fetchRentals();
        break;
      case 'DelayedRentals':
        this.fetchDelayedRentals();
        break;
      case 'Reservations':
        this.fetchReservations();
        break;
      default:
        break;
    }
  }
  GetRentals(){
    this.fetchRentals();
    this.hasFetchedRentals=true;
    this.dateFrom=''
    this.dateTo=''
  }

  fetchRentals() {
    // Check if date inputs are provided
    if (this.dateFrom && this.dateTo && new Date(this.dateFrom) > new Date(this.dateTo)) {
      // Show the SweetAlert2 warning
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Date Range',
        text: 'Please select a valid date range. The "From Date" cannot be greater than the "To Date".',
        confirmButtonText: 'OK'
      });
      return; // Exit the function if the dates are invalid
    }
  
    // Fetch rentals based on the presence of date inputs
    this.reportsService.getRentals(this.dateFrom || null, this.dateTo || null).subscribe(data => {
      this.rentals = data;
      console.log(this.rentals);
      this.selectedReport = 'Rentals';
      // this.hasFetchedRentals = true;
    });
  }
  
  fetchDelayedRentals() {
    this.reportsService.getDelayedRentals().subscribe(data => {
      this.delayedRentals = data;
      console.log(this.delayedRentals);
      this.selectedReport = 'DelayedRentals';
      this.hasFetchedRentals = false;

    });
  }

  fetchReservations() {
    this.reportsService.getReservation().subscribe(data => {
      this.reservations = data;
      this.selectedReport = 'Reservations';
      this.hasFetchedRentals = false;
    });
  }

  exportToPDF() {
    const doc = new jsPDF();

    if (this.selectedReport === 'Rentals' && this.rentals.length > 0) {
        const columns = ['Client ID', 'Client Name', 'Client Phone', 'Car', 'Rental Date', 'End Date', 'Rental Price'];
        const rows = this.rentals.map(rental => [
            rental.clientID.toString(),                // Convert to string
            rental.clientName,
            rental.clientPhone,
            rental.car,
            this.formatDate(rental.rentalDate),       // Format date
            this.formatDate(rental.endDate),          // Format date
            rental.rentalPrice.toString(),             // Convert to string
        ]);

        autoTable(doc, { head: [columns], body: rows });
        doc.save('rentals.pdf');

    } else if (this.selectedReport === 'DelayedRentals' && this.delayedRentals.length > 0) {
        const columns = ['Client ID', 'Client Name', 'Client Phone', 'Car', 'Rental Date', 'End Date', 'Rental Price', 'Delay In Days', 'Actual Return Date'];
        const rows = this.delayedRentals.map(delayedRental => [
            delayedRental.clientID.toString(),            // Convert to string
            delayedRental.clientName,
            delayedRental.clientPhone,
            delayedRental.car,
            this.formatDate(delayedRental.rentalDate),    // Format date
            this.formatDate(delayedRental.endDate),       // Format date
            delayedRental.rentalPrice.toString(),         // Convert to string
            delayedRental.delayInDays.toString(),         // Convert to string
            this.formatDate(delayedRental.actualReturnDate) // Format date
        ]);

        autoTable(doc, { head: [columns], body: rows });
        doc.save('delayed_rentals.pdf');

    } else if (this.selectedReport === 'Reservations' && this.reservations.length > 0) {
        const columns = ['Client ID', 'Client Name', 'Client Phone', 'Car', 'Reservation Fee','Reservation Date', 'End Date'];
        const rows = this.reservations.map(reservation => [
            reservation.clientID.toString(),                // Convert to string
            reservation.clientName,
            reservation.clientPhone,
            reservation.car,
            reservation.reservationFee.toString(),
            this.formatDate(reservation.reservationDate),   // Format date
            this.formatDate(reservation.endDate)            // Format date
        ]);

        autoTable(doc, { head: [columns], body: rows });
        doc.save('reservations.pdf');
    }
}

// Helper method to format dates
private formatDate(date: any): string {
    if (date) {
        const jsDate = new Date(date);
        return jsDate.toLocaleDateString(); // Customize format as needed
    }
    return ''; // Return empty string if date is invalid
}


  // Method to export table to PDF
  // exportToPDF() {
  //   const data = document.getElementById('pdfTable'); // Use the ID of the table you want to export
  //   if (data) {
  //     html2canvas(data).then(canvas => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF();
  //       const imgWidth = 190; // Set width according to your requirement
  //       const pageHeight = pdf.internal.pageSize.height;
  //       const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //       let heightLeft = imgHeight;

  //       let position = 0;

  //       pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
  //       heightLeft -= pageHeight;

  //       while (heightLeft >= 0) {
  //         position = heightLeft - imgHeight;
  //         pdf.addPage();
  //         pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
  //         heightLeft -= pageHeight;
  //       }

  //       pdf.save('table.pdf');
  //     });
  //   }
  // }
}
