import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { SendEventComponent } from './send-event/send-event.component';
import { ShowUserComponent } from './show-user/show-user.component';
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
import {StartPageComponent} from './startpage/startpage.component';
import {StudentListComponent} from './studentlist/studentlist.component';
import {CheckModalComponent} from './check-modal/check-modal.component';

const routes:Routes = [
  // {path:'',redirectTo:'/home', pathMatch:'full'},
  {path:'',redirectTo:'/start', pathMatch:'full'},
  {path:'register', component:RegisterComponent},
  {path:'home', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'add', component:AddComponent},
  {path:'edit/:id', component:EditComponent},
  {path:'show/:id', component:ShowComponent},
  {path:'show-user/:id', component:ShowUserComponent},
  {path:'send-event/:id', component:SendEventComponent},
  {path:'eventoverview/:id', component:EventOverviewComponent},
  {path:'start', component:StartPageComponent},
  {path:'studentlist/:id', component: StudentListComponent},
  {path:'check-modal', component: CheckModalComponent}
  ];

@Injectable()
export class AppGlobals {
// use this property for property binding
  appglobals: any;
  // constructor(http:Http){

  // }
  public isUserLoggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isregistered:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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

  setRegistrationStatus(isregistered){
   this.isregistered = isregistered;
  }
  getRegistrationStatus(){
    return this.isregistered;
  }
}

@Injectable()
export class AppEventId {
// use this property for property binding
  AppEventId: any;

  public enteredEventId: any;

  public user;
  setEnteredEventId(isValue){
   this.enteredEventId = isValue;
  }
  getEnteredEventId(){
    return this.enteredEventId;
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
