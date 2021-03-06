import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {EventService} from '../event.service';
import {Event} from '../event';
import {UserService} from '../user.service';
import {User} from '../user';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import {AppGlobals} from '../app-routing.module';
import { Inject } from "@angular/core";
import {forwardRef} from "@angular/core";

@Component({
  selector: 'app-eventoverview',
  templateUrl: './eventoverview.component.html',
  styleUrls: ['./eventoverview.component.css']
})
export class EventOverviewComponent implements OnInit {

  constructor(
      public eventService:EventService,
      public route:ActivatedRoute,
      public router:Router,
      @Inject(forwardRef(() => AppGlobals)) public appglobals: AppGlobals

  	) { }

  ngOnInit() {
  	this.getEvent();
  	this.user=this.appglobals.getUserGlobal();
  }

  toggleView: boolean=false;
  user:any;
  event: Event;
  getEvent(){
  	var id = this.route.snapshot.params['id'];
  	this.eventService.getEvent(id)
  	      .subscribe(event=>{
  	      	this.event = event;
  	      	console.log(this.event);
  	      })
  }

  updateEvent(){
    var id = this.route.snapshot.params['id'];
    this.eventService.updateEvent(id,this.event)
      .subscribe(event=>{
      })
  }

   goBack(){
   	this.router.navigate(['/home']);
   }

  addToDeclineList(){
     if(((this.event.acceptList.includes(this.user.name))==false)&&((this.event.declineList.includes(this.user.name))==false))
     {
       this.event.declineList.push(this.user.name);
       this.updateEvent();
     }

  }

   addToAcceptList() {
    console.log('added to accept list');
     if ((((this.event.acceptList.includes(this.user.name)) == false))&&((this.event.declineList.includes(this.user.name))==false))
     {
       this.event.acceptList.push(this.user.name);
       this.updateEvent();
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
  toggleParticipantView(){
     if(this.toggleView==false)
       this.toggleView=true;
     else
       this.toggleView=false;
  }

}
