import { FetchService } from 'src/app/services/fetch.service';
import { Component, OnInit } from '@angular/core';
import { Releases, Categories, Operation } from 'src/app/BlueBankInterfaces';
import { DatamanipulationService } from 'src/app/services/datamanipulation.service';

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
 totalOfPages!: number
 actualPage: string = '1'
 start: number = 0
 end: number = 10
 salt: number = 10
 varshowModal: boolean = false
 currentItemIdforDelet?: number | string

 constructor(public fetchService: FetchService, private dataManip: DatamanipulationService) { }

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
    this.totalOfPages = Math.ceil(this.originalReleases$.length / this.salt)
   })
 }

 filterbydate(releases$: Releases[], min: String, max: String) {
  if (min == '' || max == '') {
   return
  }
  releases$ = this.originalReleases$
  if (Number(this.actualPage) > 1) {
   this.actualPage = '1'
   this.start = 0
   this.end = 10
  }
  let myArr = releases$.filter(release => {
   return String(release.releaseDate) >= min && String(release.releaseDate) <= max
  })
  this.releases$ = myArr
 }

 deleteRelease(): void {
  this.varshowModal = !this.varshowModal
  this.currentItemIdforDelet = Number(this.currentItemIdforDelet)
  this.fetchService.deleteRelease(this.currentItemIdforDelet).subscribe(_ => {
   this.currentItemIdforDelet = ''
   this.getReleases()
  })
 }

 nextPage(releases$: Releases[], actualPage: string): void {
  this.totalOfPages = Math.ceil(releases$.length / this.salt)
  let localActualPAge = Number(actualPage)
  if (localActualPAge < this.totalOfPages) {
   this.start += this.salt
   this.end = this.start + this.salt
   this.actualPage = String(localActualPAge + 1)
  }
 }
 previousPage(releases$: Releases[], actualPage: string): void {
  let localActualPAge = Number(actualPage)
  if (localActualPAge > 1) {
   this.start -= this.salt
   this.end -= this.salt
   this.actualPage = String(localActualPAge - 1)
  }
 }

 showModal(releaseId: number): void {
  this.currentItemIdforDelet = releaseId
  this.varshowModal = !this.varshowModal
 }
}


// se a função filterbydate for disparada e a página for diferente de um, preciso descobrir como fazer a renderização voltar à página 1.