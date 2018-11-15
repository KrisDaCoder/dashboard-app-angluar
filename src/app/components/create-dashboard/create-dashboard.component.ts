import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { DashboardNameValidators } from './dashboard-name.validators';

@Component({
  selector: 'app-create-dashboard',
  templateUrl: './create-dashboard.component.html',
  styleUrls: ['./create-dashboard.component.css']
})
export class CreateDashboardComponent implements OnInit {

  form: FormGroup;
  data: string[];

  constructor(
    private dialogRef: MatDialogRef<CreateDashboardComponent>,
    @Inject(MAT_DIALOG_DATA) data 
  ) { 
    this.data = data;
   }

  ngOnInit() {
    this.form = new FormGroup({
      dashboardName: new FormControl(
        '', [
          Validators.required,
          DashboardNameValidators.nameIsTaken(this.data)
        ]
      )
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
