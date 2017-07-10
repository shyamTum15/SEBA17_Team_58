import { Component, OnInit } from '@angular/core';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {UserService} from '../user.service';
import {User} from '../user';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import {AppGlobals} from '../app-routing.module';
import { Inject } from "@angular/core";

import {EventService} from '../event.service';
import {Event} from '../event';
import {forwardRef} from "@angular/core";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(

     public userService:UserService,
     public eventService:EventService,
     public route:ActivatedRoute,
     public router:Router,
     // @Inject(AppGlobals) appglobals: AppGlobals
     // public appglobals: AppGlobals
     @Inject(forwardRef(() => AppGlobals)) public appglobals: AppGlobals
  	) { }

  ngOnInit() {
    console.log("within function ngOnInit getEvents = ", this.getEvents());
    if(this.appglobals.getUserGlobal()!=null){
      console.log("from home user ",this.appglobals.getUserGlobal());
  	  this.getEvents();
  }
 }
  events:Event;
  getEvents(){
  	this.eventService.getEvents()
  	    .subscribe(events=>{
  	    	this.events = events;

          console.log("within function getevents this.events=  ", this.events);
  	    })
  }

  deleteEvent(id){
    this.eventService.deleteEvent(id)
         .subscribe(()=>{
           this.getEvents();
         })
  }
}
