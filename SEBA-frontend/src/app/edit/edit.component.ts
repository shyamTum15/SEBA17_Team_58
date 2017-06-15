import { Component, OnInit } from '@angular/core';

import {EventService} from '../event.service';
import {Event} from '../event';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
      public eventService:EventService,
      public route:ActivatedRoute,
      public router:Router
  	) { }

  ngOnInit() {
  	this.getEvent();
  }

  model = new Event();
  event: Event;
  getEvent(){
  	var id = this.route.snapshot.params['id'];
  	this.eventService.getEvent(id)
  	      .subscribe(event=>{
  	      	this.model  = event;
  	      })
  }

  updateEvent(){
  	var id = this.route.snapshot.params['id'];
  	this.eventService.updateEvent(id,this.model)
  	     .subscribe(()=>this.goBack())
  }

   goBack(){
   	this.router.navigate(['/home']);
   }

}
