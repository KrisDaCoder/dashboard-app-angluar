import { NgModule } from "@angular/core";
import { 
  MatButtonModule, 
  MatIconModule, 
  MatSidenavModule, 
  MatToolbarModule, 
  MatListModule, 
  MatSelectModule, 
  MatMenuModule, 
  MatFormFieldModule,
  MatDialogModule, 
  MatInputModule,
  MatCardModule} from '@angular/material';

@NgModule({
    imports: [
      MatButtonModule, 
      MatIconModule, 
      MatSidenavModule, 
      MatToolbarModule, 
      MatListModule, 
      MatSelectModule, 
      MatMenuModule, 
      MatFormFieldModule, 
      MatInputModule, 
      MatDialogModule, 
      MatCardModule
    ],
    exports: [
      MatButtonModule, 
      MatIconModule, 
      MatSidenavModule, 
      MatToolbarModule, 
      MatListModule, 
      MatSelectModule, 
      MatMenuModule, 
      MatFormFieldModule, 
      MatInputModule, 
      MatDialogModule, 
      MatCardModule
    ]
  })
export class MaterialModule { }