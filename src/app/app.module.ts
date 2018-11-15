import { ApiService } from './services/api.service';
import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridsterModule } from 'angular-gridster2';
import { CommonModule } from '@angular/common';  
import { AngularDraggableModule } from 'angular2-draggable';
import {FlexLayoutModule} from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { SideBarNavComponent } from './components/side-bar-nav/side-bar-nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateDashboardComponent } from './components/create-dashboard/create-dashboard.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { DeleteChartComponent } from './components/delete-chart/delete-chart.component';
import { EditLineChartComponent } from './components/edit-line-chart/edit-line-chart.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { EditBarChartComponent } from './components/edit-bar-chart/edit-bar-chart.component';
import { DashboardService } from './services/dashboard.service';
import { DataService } from './services/data.service';
import { SelectDataComponent } from './components/select-data/select-data.component';
import { CreateLineChartComponent } from './components/create-line-chart/create-line-chart.component';
import { CreateBarChartComponent } from './components/create-bar-chart/create-bar-chart.component';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { EditDashboardComponent } from './components/edit-dashboard/edit-dashboard.component';
import { DeleteDashboardComponent } from './components/delete-dashboard/delete-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarNavComponent,
    DashboardComponent,
    CreateDashboardComponent,
    DeleteChartComponent,
    EditLineChartComponent,
    EditBarChartComponent,
    SelectDataComponent,
    CreateLineChartComponent,
    CreateBarChartComponent,
    LoadingSpinnerComponent,
    EditDashboardComponent,
    DeleteDashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    GridsterModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    AngularDraggableModule,
    FlexLayoutModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [
    ApiService, 
    DashboardService, 
    DataService],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateDashboardComponent, 
    DeleteChartComponent, 
    EditLineChartComponent, 
    EditBarChartComponent, 
    SelectDataComponent, 
    CreateLineChartComponent, 
    CreateBarChartComponent, 
    EditDashboardComponent,
    DeleteDashboardComponent
  ]
})
export class AppModule { }