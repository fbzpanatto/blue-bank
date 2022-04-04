import { Releases, Categories } from 'src/app/BlueBankInterfaces';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
 selector: 'app-dashboard',
 templateUrl: './dashboard.component.html',
 styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

 categories$: Categories[] = []
 releases$: Releases[] = []

 entradas!: number
 saidas!: number

 arrdasentradas!: any
 arradassaidas!: any

 @Output() newTitleEvent = new EventEmitter<string>()

 constructor(private fetch: FetchService) { }

 ngOnInit(): void {
  this.newTitleEvent.emit('Dashboard')
  this.getCategoriesAndReleases()
 }

 getCategoriesAndReleases() {
  this.fetch.loadCategories().subscribe(categories => {
   this.categories$ = categories
   this.fetch.getAllReleases().subscribe(releases => {
    this.releases$ = releases
    // chamar minhas funções aqui?
    this.formatandoArrayParaoFront()
   })
  })

 }
 formatandoArrayParaoFront() {
  this.categories$.forEach(category => {
   this.releases$.forEach(release => {
    release.releaseValue = Number(release.releaseValue)
    if (category.id == release.category) {
     release.category = category.name
    }
   })
  })
  // Valor Total Entradas
  const entradas = this.releases$.filter(release => {
   return release.operation == 1
  }).reduce((acc: number, curr: Releases) => {
   return acc += Number(curr.releaseValue)
  }, 0)
  // Valor Total Saídas
  const saidas = this.releases$.filter(release => {
   return release.operation == 2
  }).reduce((acc: number, curr: Releases) => {
   return acc += Number(curr.releaseValue)
  }, 0)
  // 
  let localarr: any = []
  this.categories$.forEach(category => {
   let localsum = 0
   this.releases$.forEach(release => {
    if (category.name == release.category) {
     localsum += Number(release.releaseValue)
    }
   })
   localarr.push({
    'operationId': category.operationId,
    'category': category.name,
    'totalCategoria': localsum,
    'porcentagemDoTotal': category.operationId == 1 ? Number((localsum / entradas).toFixed(2)) : Number((localsum / saidas).toFixed(2)),
    'porcenagemParaSpan': category.operationId == 1 ? `${((localsum / entradas) * 100).toFixed(2)}%` : `${((localsum / saidas) * 100).toFixed(2)}%`
   })
  })
  const arraydasentradas = localarr.filter((element: any) => {
   return element.operationId == 1
  })

  const arraydassaidas = localarr.filter((element: any) => {
   return element.operationId == 2
  })
  this.arrdasentradas = arraydasentradas
  this.arradassaidas = arraydassaidas
  this.entradas = entradas
  this.saidas = saidas
 }


}

