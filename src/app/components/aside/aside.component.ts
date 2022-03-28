import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
 selector: 'app-aside',
 templateUrl: './aside.component.html',
 styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

 @Output() listeningForNewtitle = new EventEmitter<string>()

 constructor() { }

 ngOnInit(): void {
 }

 sendNewTitle(newTitle: string): void {
  this.listeningForNewtitle.emit(newTitle)
 }

}
