import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categories, Releases, Operation } from '../BlueBankInterfaces';
import { tap } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class FetchService {

 httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
 };

 private categoriesEndpoint = 'http://localhost:3000/categories'
 private releasesEndpoint = 'http://localhost:3000/releases'
 private operationsEndpoint = 'http://localhost:3000/operations'

 constructor(private http: HttpClient) { }


 /* Releases */

 getAllReleases(): Observable<Releases[]> {
  return this.http.get<Releases[]>(this.releasesEndpoint)
 }

 addRelease(release: Releases): Observable<Releases> {
  return this.http.post<Releases>(this.releasesEndpoint, release, this.httpOptions).pipe(
   tap((newRelease: Releases) => console.log('added release', newRelease))
  )
 }

 /* Categories */
 loadCategories(): Observable<Categories[]> {
  return this.http.get<Categories[]>(this.categoriesEndpoint)
 }

 /*Operations*/
 loadOperations(): Observable<Operation[]> {
  return this.http.get<Operation[]>(this.operationsEndpoint)
 }
}
