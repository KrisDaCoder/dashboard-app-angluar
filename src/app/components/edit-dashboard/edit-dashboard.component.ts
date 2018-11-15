import { DashboardService } from './../../services/dashboard.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DashboardNameValidators } from './../create-dashboard/dashboard-name.validators';

@Component({
  selector: 'app-edit-dashboard',
  templateUrl: './edit-dashboard.component.html',
  styleUrls: ['./edit-dashboard.component.css']
})
export class EditDashboardComponent implements OnInit {

  form: FormGroup;
  data: any;
  showForm: boolean = false;
  currentDashboard: any;

  constructor(
    private dashboardService: DashboardService,
    private dialogRef: MatDialogRef<EditDashboardComponent>,
    @Inject(MAT_DIALOG_DATA) data 
  ) { 
    this.data = data;
    this.form = new FormGroup({});
   }

  ngOnInit() {

    this.dashboardService.getDashboard(this.data.activeDashboardId).subscribe(dashboard => {
      this.currentDashboard = dashboard;      

      this.form = new FormGroup({
        dashboardName: new FormControl(
          this.currentDashboard.name, [
            Validators.required,
            DashboardNameValidators.nameIsTaken(this.data.dashboards)
          ]
        )
      });

      this.showForm = true;

    });

  }

  cancel() {
    this.dialogRef.close(0);
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  get dashboardName() {
    return this.form.get('dashboardName');
  }

}
