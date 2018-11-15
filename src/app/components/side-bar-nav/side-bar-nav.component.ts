import { DashboardService } from './../../services/dashboard.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CreateDashboardComponent } from './../create-dashboard/create-dashboard.component';
import { MatDialog, MatDialogConfig, MatSidenav } from '@angular/material';
import { CommunicationService } from './../../services/communication.service';
import { EditDashboardComponent } from '../edit-dashboard/edit-dashboard.component';
import { DeleteDashboardComponent } from '../delete-dashboard/delete-dashboard.component';

@Component({
  selector: 'app-side-bar-nav',
  templateUrl: './side-bar-nav.component.html',
  styleUrls: ['./side-bar-nav.component.css']
})
export class SideBarNavComponent implements OnInit {

  @ViewChild('sidenav')
  private sidenav: MatSidenav;
  currentDashboard: string;
  dashboards: any[];
  dashboardsSSE: any[];
  noDashboard: boolean = true;
  newDashboard = {
    name: null,
    charts: []
  }

  constructor(
    private communicationService: CommunicationService,
    private dialog: MatDialog,
    private flashMessagesService: FlashMessagesService,
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {

    // this.dashboardService.getDashboards().subscribe(data => {
    this.dashboardService.getDashboardsSSE().subscribe(data => {

      if(data.length > 0) {
        this.dashboards = data;
        this.currentDashboard = this.dashboards[0].id;
        this.communicationService.setDashboard(this.currentDashboard);  
        this.noDashboard = false;
      }
    });

  }

  changeOnSelectDashboard(e) {
    this.currentDashboard = e.value;
    this.communicationService.setDashboard(this.currentDashboard);
  }

  showAddDashboardDialog() {

    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.data = [];

    this.dashboards.forEach(dashboard => {
      config.data.push(dashboard.name);
    });

    const dialogRef = this.dialog.open(CreateDashboardComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      if(result !== 0) {
        let dashboard = {
          name: result.dashboardName,
          charts: []
        }

        this.dashboardService.saveDashboard(dashboard).subscribe(response => {
          this.flashMessagesService.show('Dashboard added', {cssClass: 'mat-success', timeout: '4000'});
          this.dashboardService.getDashboards().subscribe(data => {
            this.dashboards = data;
            this.currentDashboard = this.dashboards[this.dashboards.length - 1].id;
            this.communicationService.setDashboard(this.currentDashboard);
          });
        });
        
      }
    });

  }

  showEditDashboardDialog() {

    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    let dashboards = [];

    this.dashboards.forEach(dashboard => {
      dashboards.push(dashboard.name);
    });
    let activeDashboardId = this.currentDashboard;

    config.data = {
      dashboards,
      activeDashboardId
    }

    const dialogRef = this.dialog.open(EditDashboardComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      if(result !== 0) {
        let updatedDashboard;
        this.dashboards.forEach(dashboard => {
          if (dashboard.id === this.currentDashboard) {
            dashboard.name = result.dashboardName;
            updatedDashboard = dashboard;
          }
        })

        this.dashboardService.updateDashboard(updatedDashboard).subscribe(response => {
          this.flashMessagesService.show('Dashboard updated', {cssClass: 'mat-success', timeout: '4000'});
        });
        
      }
    });

  }

  deleteDashboard() {

    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;

    const dialogRef = this.dialog.open(DeleteDashboardComponent, config);

    dialogRef.afterClosed().subscribe(response => {
      if(response === 1) {
        this.dashboardService.deleteDashboard(this.currentDashboard).subscribe(result => {
          this.flashMessagesService.show('Dashboard deleted', {cssClass: 'mat-success', timeout: '4000'});
          this.communicationService.setDashboard(this.dashboards[0].id);
          this.ngOnInit();
        });
      }
    });

  }

  pieChartDragStartHandler(e) {
    this.sidenav.toggle();
    // let img = document.createElement('img');
    // img.src = "../../../assets/images/pie-chart.gif";
    // ev.dataTransfer.setDragImage(img, 275, 150);

    e.dataTransfer.setData('type', 'pie');    
    
  }

  lineChartDragStartHandler(e) {
    this.sidenav.toggle();
    // let img = document.createElement('img');
    // img.src = "../../../assets/images/line-chart.gif";
    // ev.dataTransfer.setDragImage(img, 275, 150);

    e.dataTransfer.setData('type', 'line');
    
  }

  barChartDragStartHandler(e) {
    this.sidenav.toggle();
    // let img = document.createElement('img');
    // img.src = "../../../assets/images/bar-chart.gif";
    // ev.dataTransfer.setDragImage(img, 275, 150);

    e.dataTransfer.setData('type', 'bar');
    
  }

}