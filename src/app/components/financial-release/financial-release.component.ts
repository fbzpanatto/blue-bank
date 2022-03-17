import { Component, OnInit } from '@angular/core';

@Component({
 selector: 'app-financial-release',
 templateUrl: './financial-release.component.html',
 styleUrls: ['./financial-release.component.css']
})
export class FinancialReleaseComponent implements OnInit {

 constructor() { }

 ngOnInit(): void {
 }

 submit(event: any): void {
  event.preventDefault()
  console.log("FinancialReleaseComponent enviando formulario")
 }

}
