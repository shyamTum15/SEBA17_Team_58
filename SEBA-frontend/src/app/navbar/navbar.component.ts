import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {UserService} from '../user.service';
import {User} from '../user';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import {AppGlobals} from '../app-routing.module';
import { Inject } from "@angular/core";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
     public userService:UserService,
     public route:ActivatedRoute,
     public router:Router,
     // @Inject(AppGlobals) appglobals: AppGlobals
     public appglobals: AppGlobals
  	) { }

  ngOnInit() {
  }

  model = new User();

  logOutUser(){
  	this.userService.logOutUser()
  	     // .subscribe(()=>this.goBack())
  	     .subscribe(user=>{
  	      	// this.model  = user;
  	      	console.log("before logout ",this.appglobals.getLoginStatus());
  	      	this.appglobals.setLoginStatus(false);
  	      	this.appglobals.setUserGlobal(null);
            console.log("after logout ",this.appglobals.getLoginStatus());
  	      	this.goBack();
  	   })
  }

  goBack(){
   	this.router.navigate(['/login']);
   }

}
