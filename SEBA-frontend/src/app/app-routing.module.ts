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

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }
