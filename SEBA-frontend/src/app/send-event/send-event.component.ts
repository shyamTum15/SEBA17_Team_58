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
import {StudentService} from '../student.service';
import {Event} from '../event';
import {Student} from '../student';
import {forwardRef} from "@angular/core";


@Component({
  selector: 'app-send-event',
  templateUrl: './send-event.component.html',
  styleUrls: ['./send-event.component.css']
})
export class SendEventComponent implements OnInit {

  constructor(
     public userService:UserService,
     public studentService:StudentService,
     public eventService:EventService,
     public route:ActivatedRoute,
     public router:Router,
     // @Inject(AppGlobals) appglobals: AppGlobals
     // public appglobals: AppGlobals
     @Inject(forwardRef(() => AppGlobals)) public appglobals: AppGlobals
  	) { }

  model = new Event();
  event: Event;
  modelStudent = new Student();
  student: Student;
  temp =  new Student();
  temp1={};

  getEvent(){
  	var id = this.route.snapshot.params['id'];
  	this.eventService.getEvent(id)
  	      .subscribe(event=>{
  	      	this.model  = event;
  	        console.log("From send event api call ",JSON.stringify(this.model));

  	      })
  }

  getEvent2(){
    var id = this.route.snapshot.params['id'];
  	this.eventService.getEvent(id)
  	      .subscribe(event=>{
  	      	this.event  = event;
          })
  }

  getStudentByClass(){
  	var clss = this.model.class;
  	this.studentService.getStudentsByClass(clss)
  	      .subscribe(student=>{
  	      	this.modelStudent  = student;
  	 console.log("student fetched in send event page ",JSON.stringify(student));
  	 var arr = student.map(function (el) {
  	 	console.log("el.parentemail ",el.parentemail);
     return el.parentemail;
});

  	      })
  	 }

   sendNotification(parentEmail,eventId){
   	       console.log("checking event Id if global from send event ts ",JSON.stringify(this.model));
   	      console.log("I am in sendnotification within send-event user email: ", this.appglobals.getUserGlobal().email.toString());
   	      let userEmail = this.appglobals.getUserGlobal().email.toString();
         this.eventService.sendNotification(parentEmail,userEmail,eventId)
              .subscribe(notification=>{
              	console.log("notification from backend ",notification);
              });
         alert("Notification sent");
   }

  	 getStudentList(){
  	 	this.getStudentByClass();
  	 }

  ngOnInit() {
    this.getEvent2();
  	this.getEvent();
  }

}
