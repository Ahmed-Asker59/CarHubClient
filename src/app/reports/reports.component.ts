import { Component, signal } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ReportViewerComponent } from '../report-viewer/report-viewer.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [SidebarComponent, RouterModule, ReportViewerComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {

  isLeftSidebarCollapsed = signal<boolean>(false);
 
  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }

  
}
