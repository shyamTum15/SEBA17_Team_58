import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {UserService} from '../user.service';
import {User} from '../user';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import {AppGlobals} from '../app-routing.module';
import {AppEventId} from '../app-routing.module';
import { Inject } from "@angular/core";
import {forwardRef} from "@angular/core";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
     public userService:UserService,
     public route:ActivatedRoute,
     public router:Router,
     // public appglobals: AppGlobals
     @Inject(forwardRef(() => AppGlobals)) public appglobals: AppGlobals,
     @Inject(forwardRef(() => AppEventId)) public appEventId: AppEventId
     ) { }

  ngOnInit() {
  }

  model = new User();
  user;
  addUser(){
  	this.userService.addUser(this.model)
  	     .subscribe(()=>this.goLogin())
  }


  authenticateUser(){
  	this.userService.authenticateUser(this.model)
  	     // .subscribe(()=>this.goBack())
  	     .subscribe(user=>{
  	      	this.model  = user;
  	      	console.log("Fetched value in front end ",JSON.stringify(user));

  	      	if(this.model!=null){
              this.appglobals.setLoginStatus(true);
              this.appglobals.setUserGlobal(this.model);
              this.appglobals.setRegistrationStatus(false);
              console.log("Value stored for user in global: ",this.appglobals.getUserGlobal());
  	      	  this.goHome();
  	      } else{
  	      	alert("Email or Password is incorrect");
  	      	window.location.reload(); 
  	      }
  	   })
  }

  goHome(){
    console.log("get user from login ", this.appglobals.getUserGlobal().role);
    if (this.appglobals.getUserGlobal().role=="Parent"){
    	console.log("I am under go home parent");
        this.router.navigate(['/check-modal']);
    }else{
   	this.router.navigate(['/home']);
   }
  }

   goLogin(){
   	this.router.navigate(['/login']);
   }

}
