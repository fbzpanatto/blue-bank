import { Categories, Releases, Operation } from '../../BlueBankInterfaces';
import { Component, OnInit } from '@angular/core';
import { FetchService } from 'src/app/services/fetch.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';


@Component({
 selector: 'app-financial-release',
 templateUrl: './financial-release.component.html',
 styleUrls: ['./financial-release.component.css']
})
export class FinancialReleaseComponent implements OnInit {

 constructor(private fetchService: FetchService) { }

 categories$: Categories[] = []
 operations$: Operation[] = []
 releases$: Releases[] = []
 releaseId!: number

 financialReleaseForm = new FormGroup({
  category: new FormControl('', Validators.required),
  releaseValue: new FormControl('', Validators.required),
  releaseDate: new FormControl('', Validators.required),
  operation: new FormControl('', Validators.required),
  description: new FormControl('', Validators.required)
 })

 ngOnInit(): void {
  this.getCategories()
  this.getOperations()
  this.getReleases()
 }

 onSubmit() {

  // TODO: Arrumar para que todos as informações não sejam preenchidas de forma manual
  let temporaryRelease: Releases = {
   id: this.releaseId,
   userId: 1,
   ...this.financialReleaseForm.value
  }

  console.log(temporaryRelease)
  this.add(temporaryRelease)
  this.financialReleaseForm.reset()


 }

 add(release: Releases): void {
  this.fetchService.addRelease(release)
   .subscribe(release => {
    console.log("release cadastrado com sucesso", release)
   })
 }

 getCategories(): void {
  this.fetchService.loadCategories()
   .subscribe(categories => {
    this.categories$ = categories
    console.log(this.categories$)
   })
 }

 getReleases(): void {
  this.fetchService.getAllReleases()
   .subscribe(releases => {
    if (releases.length == 0) {
     this.releaseId = 1
    } else {
     this.releaseId = releases.length + 1
    }
    this.releases$ = releases
   })
 }

 getOperations(): void {
  this.fetchService.loadOperations()
   .subscribe(operations => {
    this.operations$ = operations
   })
 }



}
