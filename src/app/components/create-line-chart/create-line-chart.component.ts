import { EditChartValidators } from './../edit-line-chart/edit-chart.validators';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";


@Component({
  selector: 'app-create-line-chart',
  templateUrl: './create-line-chart.component.html',
  styleUrls: ['./create-line-chart.component.css']
})
export class CreateLineChartComponent implements OnInit {

  form: FormGroup;
  data: any;

  constructor(
    private dialogRef: MatDialogRef<CreateLineChartComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.data = data;
   }

  ngOnInit() {

    this.form = new FormGroup({
      chartTitle: new FormControl(
        '', [
          Validators.required
        ]
      ),
      chartLabel: new FormControl(
        '', [
          Validators.required
        ]
      ),
      chartBackgroundColor: new FormControl(
        '', [
          Validators.required,
          EditChartValidators.validateColor
        ]
      ),
      chartBorderColor: new FormControl(
        '', [
          Validators.required,
          EditChartValidators.validateColor
        ]
      )
    });

  }

  cancel() {
    this.dialogRef.close(0);
  }

  create() {
    let response = {
      formValue: this.form.value,
      data: this.data
    }
    this.dialogRef.close(response);
  }

  get chartTitle() {
    return this.form.get('chartTitle');
  }

  get chartLabel() {
    return this.form.get('chartLabel');
  }

  get chartBackgroundColor() {
    return this.form.get('chartBackgroundColor');
  }

  get chartBorderColor() {
    return this.form.get('chartBorderColor');
  }

}