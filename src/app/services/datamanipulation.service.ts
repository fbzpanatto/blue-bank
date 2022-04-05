import { Injectable } from '@angular/core';
import { FetchService } from './fetch.service';
import { Categories, Releases } from '../BlueBankInterfaces';
import { Observable, tap } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class DatamanipulationService {

 public releases$!: Observable<Releases[]>

 constructor(private fetchService: FetchService) {
  this.releases$ = fetchService.getAllReleases()
 }
}
