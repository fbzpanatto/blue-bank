import { Injectable } from '@angular/core';
import { FetchService } from './fetch.service';
import { Categories, Releases } from '../BlueBankInterfaces';

@Injectable({
 providedIn: 'root'
})
export class DatamanipulationService {

 constructor(private fetchService: FetchService) { }

}
