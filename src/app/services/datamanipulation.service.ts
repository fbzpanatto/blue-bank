import { Injectable } from '@angular/core';
import { FetchService } from './fetch.service';
import { Categories, Releases } from '../BlueBankInterfaces';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Injectable({
 providedIn: 'root'
})
export class DatamanipulationService implements OnInit {

 public releases$: Releases[] = []

 public entradas!: number
 public saidas!: number

 public arrdasentradas!: any
 public arradassaidas!: any

 constructor(private fetchService: FetchService) { }

 ngOnInit(): void { }

 getCategoriesAndReleases() {
  this.entradas = 0
  this.saidas = 0
  this.fetchService.getAllReleases().subscribe(releases => {
   this.releases$ = releases
   this.entradas = this.totalByOperation('Entradas', this.releases$)
   this.saidas = this.totalByOperation('Saídas', this.releases$)
   this.formatandoArrayParaoFront()
  })

 }

 totalByCategory(releases: Releases[], categoryNameCurr: string | number): number {
  return releases.reduce((prev, next) => {
   if (categoryNameCurr === next.category) {
    prev += Number(next.releaseValue)
   }
   return prev
  }, 0)
 }

 totalByOperation(operation: string, releases: Releases[]): number {
  return releases.filter(el => {
   return el.operation == operation
  }).reduce((acc, next) => {
   return acc += Number(next.releaseValue)
  }, 0)
 }

 formatandoArrayParaoFront() {

  let category: any = {}
  let idOperacaoEntrada = 'Entradas'
  let idOperacaoSaida = 'Saídas'

  const totalByOperationAndCategory = this.releases$.reduce((acc: any, curr: Releases) => {

   if (!acc[curr.operation]) {
    acc[curr.operation] = []
   }
   if (idOperacaoEntrada == curr.operation) {
    const categoryTest = acc[idOperacaoEntrada].filter((el: any) => {
     return el.name == curr.category
    })
    if (categoryTest.length < 1) {
     category.name = curr.category
     category.value = Number(this.totalByCategory(this.releases$, curr.category).toFixed(2))
     category.perce = Number((category.value / this.entradas).toFixed(2))
     category.tospa = `${((category.value / this.entradas) * 100).toFixed(2)}%`
     acc[idOperacaoEntrada].push(category)
     category = {}
    }
   } else {
    const categoryTest = acc[idOperacaoSaida].filter((el: any) => {
     return el.name == curr.category
    })
    if (categoryTest.length < 1) {
     category.name = curr.category
     category.value = Number(this.totalByCategory(this.releases$, curr.category).toFixed(2))
     category.perce = Number((category.value / this.saidas).toFixed(2))
     category.tospa = `${((category.value / this.saidas) * 100).toFixed(2)}%`
     acc[idOperacaoSaida].push(category)
     category = {}
    }
   }
   return acc
  }, {})

  this.arrdasentradas = totalByOperationAndCategory['Entradas']
  this.arradassaidas = totalByOperationAndCategory['Saídas']

  console.log(totalByOperationAndCategory)
 }
}
