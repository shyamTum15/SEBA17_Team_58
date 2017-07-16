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
import {StudentService} from '../student.service';
import {Student} from '../student';
import {forwardRef} from "@angular/core";
import {AppEventId} from '../app-routing.module';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(

     public userService:UserService,
     public eventService:EventService,
     public studentService:StudentService,
     public route:ActivatedRoute,
     public router:Router,
     // public flag= false,
     // @Inject(AppGlobals) appglobals: AppGlobals
     // public appglobals: AppGlobals
     @Inject(forwardRef(() => AppGlobals)) public appglobals: AppGlobals,
     // public appEventId: AppEventId
     @Inject(forwardRef(() => AppEventId)) public appEventId: AppEventId
  	) { }

  ngOnInit() {
    console.log("within function ngOnInit getEvents = ", this.getEvents());
    if(this.appglobals.getUserGlobal()!=null){
      console.log("from home user ",this.appglobals.getUserGlobal());
  	  this.getEvents();
      this.userClass=this.appglobals.getUserGlobal().schoolClass.toString();
      this.userRole=this.appglobals.getUserGlobal().role.toString();
      // checkClassMatch()
  }
 }
  events:Event;
  students:Student;
  flag=false;
  userClass;
  userRole;
  getEvents(){
  	this.eventService.getEvents()
  	    .subscribe(events=>{
  	    	this.events = events;
          // this.checkClassMatch(events);
          console.log("within function getevents this.events=  ", JSON.stringify(this.events));
  	    })
  }

  // getEventEmails(){
  //   this.eventService.getEventEmails()
  //       .subscribe(events=>{
  //         this.events = events;
  //         // this.checkClassMatch(events);
  //         console.log("within function getevents this.events=  ", JSON.stringify(this.events));
  //       })
  // }

  deleteEvent(id){
    var val = 0;
    if(id){
    val = 1;
    alert("do you want to delete the event parmanently ?");
    }
    if (val==1){
    this.eventService.deleteEvent(id)
         .subscribe(()=>{
           this.getEvents();
         })
       }
  }

  hideWhenParent(){
    if(this.appglobals.getUserGlobal().role.toString()=="Teacher"){
      return true;
    }
    if(this.appglobals.getUserGlobal().role.toString()=="Parent"){
      return false;
    } else {
      return false;
    }
  }

  checkEventId(id){
    if(this.appEventId.getEnteredEventId()==id){
      return true;
    }
    else return false;
  }

  checkMatchFinal(clss){
    this.checkClassMatch(clss);
  }

  checkClassMatch(eventClass){
     console.log("the user email in checkclassmatch function ",this.appglobals.getUserGlobal().email);
     this.studentService.getStudentsByEmail(this.appglobals.getUserGlobal().email)
          .subscribe(students=>{
            this.students = students;
            console.log("The fetched students class ",JSON.stringify(this.students));
            for(var i = 0; i <(<any>this.students).length; i++) {
                  if (this.students[i].class == eventClass) {
                      this.flag= true;
                  }
                  else{this.flag= false;}
              }
          })

        
}

}
