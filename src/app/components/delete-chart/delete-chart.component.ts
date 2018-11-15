import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-delete-chart',
  templateUrl: './delete-chart.component.html',
  styleUrls: ['./delete-chart.component.css']
})
export class DeleteChartComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteChartComponent>) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close(0);
  }

  delete() {
    this.dialogRef.close(1);
  }

}