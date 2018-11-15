import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-delete-dashboard',
  templateUrl: './delete-dashboard.component.html',
  styleUrls: ['./delete-dashboard.component.css']
})
export class DeleteDashboardComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteDashboardComponent>) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close(0);
  }

  delete() {
    this.dialogRef.close(1);
  }


}
