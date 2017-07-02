import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';

import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import {EventService} from './event.service';
import {UserService} from './user.service';
import { EventOverviewComponent } from './eventoverview/eventoverview.component';
import { EditDescriptionComponent } from './editdescription/editdescription.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PlanStatusComponent } from './planstatus/planstatus.component';
import {CostComponent} from './cost/cost.component';
import {PackingListComponent} from './packingList/packinglist.component';
import {AppGlobals} from './app-routing.module';
import { Injectable } from "@angular/core";
import { Inject } from "@angular/core";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AddComponent,
    EditComponent,
    ShowComponent,
    EventOverviewComponent,
    EditDescriptionComponent,
    LoginComponent,
    RegisterComponent,
    PlanStatusComponent,
    CostComponent,
    PackingListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [EventService,UserService,AppGlobals],
  bootstrap: [AppComponent]
})
export class AppModule { }
