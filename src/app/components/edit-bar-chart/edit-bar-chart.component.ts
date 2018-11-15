import { EditChartValidators } from './../edit-line-chart/edit-chart.validators';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-edit-bar-chart',
  templateUrl: './edit-bar-chart.component.html',
  styleUrls: ['./edit-bar-chart.component.css']
})
export class EditBarChartComponent implements OnInit {

  form: FormGroup;
  data: any;
  backgroundColorsPlaceholder: any[];
  borderColorsPlaceholder: any[];

  constructor(
    private dialogRef: MatDialogRef<EditBarChartComponent>,
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
      backgroundColors: new FormArray([]),
      borderColors: new FormArray([])
    });

    this.backgroundColorsPlaceholder = [];
    let i = 1;
    this.data.backgroundColor.forEach(color => {
      (this.form.get('backgroundColors') as FormArray).push(new FormControl(
        color, [
          Validators.required,
          EditChartValidators.validateColor
        ]
      ));
      this.backgroundColorsPlaceholder.push(`Background color #${i}`);
      i++;
    });

    this.borderColorsPlaceholder = [];
    i = 1;
    this.data.borderColor.forEach(color => {
      (this.form.get('borderColors') as FormArray).push(new FormControl(
        color, [
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

  save() {
    this.dialogRef.close(this.form.value);
  }

  get chartLabel() {
    return this.form.get('chartLabel');
  }

  get chartTitle() {
    return this.form.get('chartTitle');
  }

}