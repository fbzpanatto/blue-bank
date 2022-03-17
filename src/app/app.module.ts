import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AsideComponent } from './components/aside/aside.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FinancialReleaseComponent } from './components/financial-release/financial-release.component';

@NgModule({
 declarations: [
  AppComponent,
  DashboardComponent,
  LoginComponent,
  AsideComponent,
  HeaderComponent,
  FinancialReleaseComponent
 ],
 imports: [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  HttpClientModule,
 ],
 providers: [],
 bootstrap: [AppComponent]
})
export class AppModule { }
