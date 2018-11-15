import { EditChartValidators } from './edit-chart.validators';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-edit-line-chart',
  templateUrl: './edit-line-chart.component.html',
  styleUrls: ['./edit-line-chart.component.css']
})
export class EditLineChartComponent implements OnInit {

  form: FormGroup;
  data: any;

  constructor(
    private dialogRef: MatDialogRef<EditLineChartComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.data = data;
   }

  ngOnInit() {

    this.form = new FormGroup({
      chartTitle: new FormControl(
        this.data.title, [
          Validators.required
        ]
      ),
      chartLabel: new FormControl(
        this.data.label, [
          Validators.required
        ]
      ),
      chartBackgroundColor: new FormControl(
        this.data.backgroundColor[0], [
          Validators.required,
          EditChartValidators.validateColor
        ]
      ),
      chartBorderColor: new FormControl(
        this.data.borderColor[0], [
          Validators.required,
          EditChartValidators.validateColor
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

  get chartLabel() {
    return this.form.get('chartLabel');
  }

  get chartTitle() {
    return this.form.get('chartTitle');
  }

  get chartBackgroundColor() {
    return this.form.get('chartBackgroundColor');
  }

  get chartBorderColor() {
    return this.form.get('chartBorderColor');
  }

}