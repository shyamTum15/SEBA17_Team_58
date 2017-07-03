import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {UserService} from '../user.service';
import {User} from '../user';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import {AppGlobals} from '../app-routing.module';
import { Inject } from "@angular/core";
import {forwardRef} from "@angular/core";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    public userService:UserService,
    public route:ActivatedRoute,
    public router:Router,
    @Inject(forwardRef(() => AppGlobals)) public appglobals: AppGlobals
  	) { }

  ngOnInit() {
  }
   users:User;
   model = new User();
   getUsers(){
  	this.userService.getUsers()
  	    .subscribe(users=>{
  	    	this.users = users;
          console.log("within function getusers this.users=  ", this.users);
  	    })
  }

  addUser(){
  	console.log("user to be sent ",this.model);
  	this.userService.addUser(this.model)
  	     .subscribe(()=>this.goBack())
  }

  goBack(){
  	this.appglobals.setRegistrationStatus(true);
  	alert("You are registered");
   	this.router.navigate(['/login']);
   }

}
