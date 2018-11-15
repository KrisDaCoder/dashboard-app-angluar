import { DashboardService } from './../../services/dashboard.service';
import { SelectDataComponent } from './../select-data/select-data.component';
import { DeleteChartComponent } from './../delete-chart/delete-chart.component';
import { CommunicationService } from './../../services/communication.service';
import { Component, OnInit } from '@angular/core';
import { GridsterConfig } from 'angular-gridster2';
import { Chart } from 'chart.js';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EditLineChartComponent } from '../edit-line-chart/edit-line-chart.component';
import { EditBarChartComponent } from './../edit-bar-chart/edit-bar-chart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  activeDashboard: any;
  charts: any[];
  options: GridsterConfig;
  // showButtons: boolean[];
  showGrid: boolean = true;

  constructor(
    private communicationService: CommunicationService,
    private dialog: MatDialog,
    private dashboardService: DashboardService
    ) { }

  ngOnInit() {
    this.communicationService.selectedDashboard.subscribe(value => {

      if(!(typeof value === 'undefined')) {
        this.dashboardService.getDashboard(value).subscribe(dashboard => {
          this.activeDashboard = dashboard;
          // this.charts = this.activeDashboard.charts;    
          this.showGrid = false;
          // this.showButtons = this.createBooleanArray(this.charts.length);
        });
      }
    });

    this.options = {
      swap: true,
      enableEmptyCellDrop: true,
      emptyCellDropCallback: (event, item) => this.onDrop(event, item),
      pushItems: true,
      pushDirections: { north: true, east: true, south: true, west: true },
      draggable: { enabled: true },
      resizable: {
        enabled: true,
        handles: {s: false, e: false, n: false, w: false, se: true, ne:false, sw: false, nw: false}
        // handles: {s: true, e: true, n: true, w: true, se: true, ne:true, sw: true, nw: true}

      },
      gridType: 'fixed',
      fixedColWidth: 50,
      fixedRowHeight: 50,
      maxCols: 32,
      maxRows:20,
      itemChangeCallback: (item, itemComponent) => this.itemChange(item, itemComponent),
      itemInitCallback: (item, itemComponent) => this.createCharts()
    };

  }

  itemChange(item, itemComponent) {

    this.dashboardService.updateDashboard(this.activeDashboard).subscribe(res => {
      
    });

  }

  createCharts() {

    let options;
    this.activeDashboard.charts.forEach(res => {

      if(res.type === 'pie') {
        options = {
          title: {
            display: true,
            text: res.title,
            fontSize: 18
          }
        };
      } else {
        options = {
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
          },
          title: {
            display: true,
            text: res.title,
            fontSize: 18
          }
        }
      }

      new Chart(res.htmlId, {
        type: res.type,
        data: {
            labels: res.labels,
            datasets: [
            {
                label: res.label,
                backgroundColor: res.backgroundColor,
                borderColor: res.borderColor,
                data: res.data,
                borderWidth: 3
            }
            ]
        },
        options: options
      });                  
    });

  }

  // createBooleanArray(size: number): boolean[] {
  //   let arr: boolean[] = [];
  //   for(let i=0; i < size; i++) {
  //     arr.push(false);
  //   }

  //   return arr;
  // }

  // hoverOverGridsterItem(i) {
  //   this.showButtons[i] = true;
  // }

  // leaveGridsteritem(i) {
  //   this.showButtons[i] = false;    
  // }

  deleteChart(i) {

    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;

    const dialogRef = this.dialog.open(DeleteChartComponent, config);

    dialogRef.afterClosed().subscribe(result => {

      if(result === 1) {
        
        this.activeDashboard.charts.splice(i, 1);
        this.dashboardService.updateDashboard(this.activeDashboard).subscribe(res => {
          
        });
        
      }

    });

  }

  editChart(chart: any, index: number) {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.data = chart;
    
    let dialogRef;
    let newChart;
    switch (chart.type) {
      case 'line':
        dialogRef = this.dialog.open(EditLineChartComponent, config);
        dialogRef.afterClosed().subscribe(result => {
          if(result !== 0) {
            this.activeDashboard.charts[index].backgroundColor = [result.chartBackgroundColor];
            this.activeDashboard.charts[index].borderColor = [result.chartBorderColor];
            this.activeDashboard.charts[index].label = result.chartLabel;
            this.activeDashboard.charts[index].title = result.chartTitle;
            newChart = this.activeDashboard.charts[index]
            this.activeDashboard.charts.splice(index, 1);
            this.activeDashboard.charts.push(newChart);
            this.createChartFromEdit(newChart);
            this.dashboardService.updateDashboard(this.activeDashboard).subscribe(res => {
              this.activeDashboard = res;
            });
          }
        })
        break;

      case 'bar':
        dialogRef = this.dialog.open(EditBarChartComponent, config);
        dialogRef.afterClosed().subscribe(result => {
          if(result !== 0) {
            this.activeDashboard.charts[index].backgroundColor = result.backgroundColors;
            this.activeDashboard.charts[index].borderColor = result.borderColors;
            this.activeDashboard.charts[index].label = result.chartLabel;
            this.activeDashboard.charts[index].title = result.chartTitle;
            newChart = this.activeDashboard.charts[index];
            this.activeDashboard.charts.splice(index, 1);
            this.activeDashboard.charts.push(newChart);
            this.createChartFromEdit(newChart);
            this.dashboardService.updateDashboard(this.activeDashboard).subscribe(res => {
              this.activeDashboard = res;
             });
          }
        })
        break;

      case 'pie':
        dialogRef = this.dialog.open(EditBarChartComponent, config);
        dialogRef.afterClosed().subscribe(result => {
          if(result !== 0) {
            this.activeDashboard.charts[index].backgroundColor = result.backgroundColors;
            this.activeDashboard.charts[index].borderColor = result.borderColors;
            this.activeDashboard.charts[index].label = result.chartLabel;
            this.activeDashboard.charts[index].title = result.chartTitle;
            newChart = this.activeDashboard.charts[index];
            this.activeDashboard.charts.splice(index, 1);
            this.activeDashboard.charts.push(newChart);
            this.createChartFromEdit(newChart);
            this.dashboardService.updateDashboard(this.activeDashboard).subscribe(res => {
              this.activeDashboard = res;
             });
          }
        });
        break;
    
      default:
        console.log('No dialog was config for this type of chart at the moment');
        break;
    }
    
  }

  createChartFromEdit(chart: any) {

    let options;
    if(chart.type === 'pie') {
      options = {
        title: {
          display: true,
          text: chart.title,
          fontSize: 18
        }
      };
    } else {
      options = {
        scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
        },
        title: {
          display: true,
          text: chart.title,
          fontSize: 18
        }
      }
    }

    new Chart(chart.htmlId, {
      type: chart.type,
      data: {
          labels: chart.labels,
          datasets: [
          {
              label: chart.label,
              backgroundColor: chart.backgroundColor,
              borderColor: chart.borderColor,
              data: chart.data,
              borderWidth: 3
          }
          ]
      },
      options: options
    });

  }

  onDrop(event, item) {

    const chartType = event.dataTransfer.getData('type');

    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.data = chartType;

    let dialogRef;
    let newChart;
    dialogRef = this.dialog.open(SelectDataComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      if(result !== 0) {
        result.afterClosed().subscribe(response => {
          if(response !== 0) {

            if(chartType === 'line') {
              newChart = {
                htmlId: this.generateUniqueHtmlId(),
                type: chartType,
                title: response.formValue.chartTitle,
                label: response.formValue.chartLabel,
                backgroundColor: [response.formValue.chartBackgroundColor],
                borderColor: [response.formValue.chartBorderColor],
                labels: response.data.labels,
                data: response.data.data,
                coordinates: {
                  x: item.x,
                  y: item.y,
                  cols: 7,
                  rows: 4
                }
              };
            } else {
              newChart = {
                htmlId: this.generateUniqueHtmlId(),
                type: chartType,
                title: response.formValue.chartTitle,
                label: response.formValue.chartLabel,
                backgroundColor: response.formValue.backgroundColors,
                borderColor: response.formValue.borderColors,
                labels: response.data.labels,
                data: response.data.data,
                coordinates: {
                  x: item.x,
                  y: item.y,
                  cols: 7,
                  rows: 4
                }
              };
            }                    

            this.activeDashboard.charts.push(newChart);
            this.createChartFromEdit(newChart);
            this.dashboardService.updateDashboard(this.activeDashboard).subscribe(res => {
              
            });

          }
        });
      }
    });
    
  }

  generateUniqueHtmlId(): string {    
    
    let uniqueIds = [];
    this.activeDashboard.charts.forEach(chart => {
      let idSplit = chart.htmlId.split('-');
      idSplit = idSplit[1];
      uniqueIds.push(Number(idSplit));
    });

    for(let i=0; i < 640; i++) {
      if(!uniqueIds.includes(i)) {
        return `html-${i}`
      }
    }

    return '';

  }

}