import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AsideComponent } from './components/aside/aside.component';
import { FinancialReleaseComponent } from './components/financial-release/financial-release.component';
import { ListRenderComponent } from './components/list-render/list-render.component';

@NgModule({
 declarations: [
  AppComponent,
  DashboardComponent,
  LoginComponent,
  AsideComponent,
  HeaderComponent,
  FinancialReleaseComponent,
  ListRenderComponent
 ],
 imports: [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  HttpClientModule,
  ReactiveFormsModule
 ],
 providers: [],
 bootstrap: [AppComponent]
})
export class AppModule { }
