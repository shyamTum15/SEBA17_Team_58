import { Component, OnInit } from '@angular/core';

import {EventService} from '../event.service';
import {Event} from '../event';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(

     public eventService: EventService
  	) { }

  ngOnInit() {
    console.log("within function ngOnInit getEvents = ", this.getEvents());
  	this.getEvents();
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
