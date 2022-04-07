import { Component } from '@angular/core';

@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.css']
})
export class AppComponent {
 title = 'blue-bank';
 islogged: boolean = true
 headerTitle: string = ''

 constructor() {

 }

 ngOnInit() {

 }

 settingNewTitle(value: string): void {
  this.headerTitle = value
 }

 sendingReloadReleasesToChild(): void {

 }
}
