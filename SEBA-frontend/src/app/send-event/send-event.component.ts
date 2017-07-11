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

  getEvent(){
  	var id = this.route.snapshot.params['id'];
  	this.eventService.getEvent(id)
  	      .subscribe(event=>{
  	      	this.model  = event;
  	        console.log("From send event api call ",JSON.stringify(this.model));

  	      })
  }

  getStudentByClass(){
  	var clss = this.model.class;
  	this.studentService.getStudentsByClass(clss)
  	      .subscribe(student=>{
  	      	this.modelStudent  = student;
  	 console.log("student fetched in send event page ",JSON.stringify(this.modelStudent));

  	      })
  	 }

  	 getStudentList(){
  	 	this.getStudentByClass();
  	 }

  ngOnInit() {

  	this.getEvent();
  }

}
