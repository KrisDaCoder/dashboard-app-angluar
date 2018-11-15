import { Injectable } from '@angular/core';
import { ReplaySubject, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  // private dashboardSource = new BehaviorSubject<string>('5be6f135d3acda2f54a61246'); 
  // selectedDashboard = this.dashboardSource.asObservable();

  private dashboardSource: Subject<string> = new ReplaySubject<string>(); 
  selectedDashboard = this.dashboardSource.asObservable();


  constructor() { }

  setDashboard(id: string) {
    this.dashboardSource.next(id);
  }
  
}