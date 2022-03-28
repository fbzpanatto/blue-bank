import { FetchService } from 'src/app/services/fetch.service';
import { Component, OnInit } from '@angular/core';
import { Releases, Categories, Operation } from 'src/app/BlueBankInterfaces';

@Component({
 selector: 'app-list-render',
 templateUrl: './list-render.component.html',
 styleUrls: ['./list-render.component.css']
})
export class ListRenderComponent implements OnInit {

 releases$: Releases[] = []
 originalReleases$: Releases[] = []
 categories$: Categories[] = []
 operations$: Operation[] = []

 constructor(private fetchService: FetchService) { }

 ngOnInit(): void {
  this.getReleases()
  this.getCategories()
  this.getOperations()
 }

 getCategories(): void {
  this.fetchService.loadCategories()
   .subscribe(categories => {
    this.categories$ = categories
   })
 }

 getOperations(): void {
  this.fetchService.loadOperations()
   .subscribe(operations => {
    this.operations$ = operations
   })
 }

 getCategoryName(id: any) {
  let myele = this.categories$.find(el => el.id == id)
  return myele?.name
 }

 getOperationName(id: any) {
  let myele = this.operations$.find(el => el.id == id)
  return myele?.name
 }

 getReleases(): void {
  this.fetchService.getAllReleases()
   .subscribe(releases => {
    //TODO: para cada tipo de ordenação informada pelo usuário, um nova função deverá ser criada. Neste momento, estamos ordenando automáticamente do mais recente para o mais velho
    releases.sort(function (a, b) {
     if (a.releaseDate < b.releaseDate) {
      return 1
     }
     if (a.releaseDate > b.releaseDate) {
      return -1
     }
     return 0
    })
    this.releases$ = releases
    this.originalReleases$ = releases
   })
 }

 filterbydate(min: String, max: String) {
  this.releases$ = this.originalReleases$
  let myArr = this.releases$.filter(release => {
   return String(release.releaseDate) >= min && String(release.releaseDate) <= max
  })
  this.releases$ = myArr
 }

 deleteRelease(id: number): void {
  this.fetchService.deleteRelease(id).subscribe(_ => {
   this.getReleases()
  })
 }
}
