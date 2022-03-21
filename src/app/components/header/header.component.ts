import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { KeyValuePipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
 selector: 'app-header',
 templateUrl: './header.component.html',
 styleUrls: ['./header.component.css'],
 providers: [KeyValuePipe]
})
export class HeaderComponent implements OnInit {

 constructor(private http: HttpClient, private keyValue: KeyValuePipe) { }

 url = "http://api.openweathermap.org/data/2.5/weather?lat=-23.0058&lon=-46.8389&appid=2be2cf4c8de9f600f079871c1914ef97&units=metric"

 userName: string = 'Fabrizio Panato'

 myWheaterObj: any = {
  icon: '',
  description: '',
  temp: ''
 }

 ngOnInit(): void {
  // this.getdata()
 }

 // getWeather(): Observable<any> {
 //  return this.http.get<any>(this.url)
 // }

 // getdata(): void {
 //  this.getWeather()
 //   .pipe(map(data => {
 //    let result = this.keyValue.transform(data)
 //    let localTemp: any = result[6].value
 //    this.myWheaterObj.temp = localTemp.temp
 //    // TODO: A posição do array muda, preciso fazer um forEache procurando pelo key correta que exibe o icon e a descrição
 //    localTemp = result[12].value
 //    console.log(result)
 //    this.myWheaterObj.description = localTemp[0].description
 //    this.myWheaterObj.icon = `http://openweathermap.org/img/wn/${localTemp[0].icon}@2x.png`
 //   }))
 //   .subscribe()
 // }
}
