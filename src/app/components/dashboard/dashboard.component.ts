import { DatamanipulationService } from './../../services/datamanipulation.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
 selector: 'app-dashboard',
 templateUrl: './dashboard.component.html',
 styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

 @Output() newTitleEvent = new EventEmitter<string>()

 constructor(public mydata: DatamanipulationService) { }

 ngOnInit(): void {
  this.newTitleEvent.emit('Dashboard')
  this.mydata.getCategoriesAndReleases()
 }
}

