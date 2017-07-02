import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {EventService} from './event.service';
import {UserService} from './user.service';
import { EventOverviewComponent } from './eventoverview/eventoverview.component';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/startWith';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Injectable } from "@angular/core";
import { Inject } from "@angular/core";
// import {Http} from 'angular2/http';

const routes:Routes = [
  // {path:'',redirectTo:'/home', pathMatch:'full'},
  {path:'',redirectTo:'/login', pathMatch:'full'},
  {path:'register', component:RegisterComponent},
  {path:'home', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'add', component:AddComponent},
  {path:'edit/:id', component:EditComponent},
  {path:'show/:id', component:ShowComponent},
  {path:'eventoverview/:id', component:EventOverviewComponent}
  ];

@Injectable() 
export class AppGlobals {
// use this property for property binding
  appglobals: any;
  // constructor(http:Http){
    
  // }
  public isUserLoggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public user;
  setLoginStatus(isLoggedIn){
   // this.isUserLoggedIn.next(isLoggedIn);
   this.isUserLoggedIn = isLoggedIn;
  }
  getLoginStatus(){
    return this.isUserLoggedIn;
  }
  setUserGlobal(User){
    this.user = User;
  }
  getUserGlobal(){
    return this.user;
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }
