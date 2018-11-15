import { EditChartValidators } from './../edit-line-chart/edit-chart.validators';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-create-bar-chart',
  templateUrl: './create-bar-chart.component.html',
  styleUrls: ['./create-bar-chart.component.css']
})
export class CreateBarChartComponent implements OnInit {

  form: FormGroup;
  data: any;
  backgroundColorsPlaceholder: any[];
  borderColorsPlaceholder: any[];

  constructor(
    private dialogRef: MatDialogRef<CreateBarChartComponent>,
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
      backgroundColors: new FormArray([]),
      borderColors: new FormArray([])
    });

    this.backgroundColorsPlaceholder = [];
    let i = 1;
    this.data.labels.forEach(color => {
      (this.form.get('backgroundColors') as FormArray).push(new FormControl(
        '', [
          Validators.required,
          EditChartValidators.validateColor
        ]
      ));
      this.backgroundColorsPlaceholder.push(`Background color #${i}`);
      i++;
    });

    this.borderColorsPlaceholder = [];
    i = 1;
    this.data.labels.forEach(color => {
      (this.form.get('borderColors') as FormArray).push(new FormControl(
        '', [
          Validators.required,
          EditChartValidators.validateColor
        ]
      ));
      this.borderColorsPlaceholder.push(`Border color #${i}`);
      i++;
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

  get chartLabel() {
    return this.form.get('chartLabel');
  }

  get chartTitle() {
    return this.form.get('chartTitle');
  }

}