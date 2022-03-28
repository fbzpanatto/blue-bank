import { Releases, Categories } from 'src/app/BlueBankInterfaces';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FetchService } from 'src/app/services/fetch.service';

type sumOfAllCategories = {
 category: number,
 total: number
}

@Component({
 selector: 'app-dashboard',
 templateUrl: './dashboard.component.html',
 styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

 @Output() newTitleEvent = new EventEmitter<string>()

 releases$: Releases[] = []
 sumEntrance!: string
 sumWithdraw!: string
 resultado!: number
 categories$!: Categories[]
 sumByCategories: sumOfAllCategories[] = []

 constructor(private fetchService: FetchService) { }

 ngOnInit(): void {
  this.newTitleEvent.emit('Dashboard')
  this.getReleases()
  this.getCategories()
 }

 getCategories() {
  this.fetchService.loadCategories()
   .subscribe(categories => {
    this.categories$ = categories
    this.sumAllCategories()
   })
 }

 getCategoryName(id: number): string {
  let myele = this.categories$.find(el => el.id == id)
  return myele!.name
 }

 sumAllCategories() {
  this.categories$.forEach(category => {
   let localSum: number = 0
   this.releases$.forEach(release => {
    if (release.category == category.id) {
     localSum += Number(release.releaseValue)
    }
   })
   this.sumByCategories.push({ "category": Number(category.id), "total": Number(localSum) })
  })

 }

 getReleases(): void {
  this.fetchService.getAllReleases()
   .subscribe(releases => {
    this.releases$ = releases
    this.filterMyArr(this.releases$)
   })
 }

 porcentagem(totalCategoria: any): number {
  const result = Number(totalCategoria) / Number(this.sumWithdraw)
  return result * 100
 }

 gerarPorcentagemParaBarradeProgresso(totalCategoria: any) {
  const valor = this.porcentagemGanhos(totalCategoria)
  return valor * 100
 }

 porcentagemGanhos(totalCategoria: any): number {
  const result = Number(totalCategoria) / Number(this.sumEntrance)
  return result
 }

 filterMyArr(myarr: Releases[]): void {

  let sumEntrance = 0
  let sumWithdraw = 0

  myarr.forEach(release => {
   if (release.operation == 1) {
    sumEntrance += Number(release.releaseValue)
   } else if (release.operation == 2) {
    sumWithdraw += Number(release.releaseValue)
   }
  })
  this.sumEntrance = sumEntrance.toFixed(2)
  this.sumWithdraw = sumWithdraw.toFixed(2)
  this.resultado = Number(this.sumEntrance) - Number(this.sumWithdraw)
  this.resultado.toFixed(2)
 }
}
