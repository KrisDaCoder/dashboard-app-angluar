import { CreateBarChartComponent } from './../create-bar-chart/create-bar-chart.component';
import { CreateLineChartComponent } from './../create-line-chart/create-line-chart.component';
import { DataService } from './../../services/data.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef}  from "@angular/material";
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-select-data',
  templateUrl: './select-data.component.html',
  styleUrls: ['./select-data.component.css']
})
export class SelectDataComponent implements OnInit {

  form: FormGroup;
  data: any[];
  dataSourceArr: any[];
  chartTypes: string[];
  chartType: string;
  showDataType: boolean = false;
  showDataSource: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<SelectDataComponent>,
    private dataService: DataService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) chartType
    ) {
      this.chartType = chartType;
      this.form = new FormGroup({});
    }

  ngOnInit() {

    this.dataService.getData().subscribe(data => {
      this.data = data;

      this.form = new FormGroup({
        dataType: new FormControl(
          '', [
            Validators.required
          ]
        ),
        dataSource: new FormControl(
          '', [
            Validators.required
          ]
        )
      });
      this.showDataType = true;

    });

  }

  cancel() {
    this.dialogRef.close(0);
  }

  next() {

    let response;
    this.dataSourceArr.forEach(dt => {
      if(dt.title === this.form.value.dataSource) { 
        response = {
          labels: dt.labels,
          data: dt.data
        }        
      }
    });

    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.data = response;

    let dialogRefCreateChart;
    if(this.chartType === 'line') {
      dialogRefCreateChart = this.dialog.open(CreateLineChartComponent, config);
    }
    else {
      dialogRefCreateChart = this.dialog.open(CreateBarChartComponent, config);
    }

    this.dialogRef.close(dialogRefCreateChart);

  }

  get dataType() {
    return this.form.get('dataType');
  }

  get dataSource() {
    return this.form.get('dataSource');
  }

  changeOnDataType(e) {

    let currentDataType = e.value;

    this.data.forEach(el => {
      if (el.type === currentDataType) {
        this.dataSourceArr = el.data;
        this.showDataSource = true;
      }
    });

  }

}