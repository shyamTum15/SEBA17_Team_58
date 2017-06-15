import { Component, OnInit } from '@angular/core';

import {EventService} from '../event.service';
import {Event} from '../event';
import {ActivatedRoute, Params, Router} from '@angular/router';


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  constructor(
      public eventService:EventService,
      public route:ActivatedRoute,
      public router:Router
  	) { }

  ngOnInit() {
  	this.getEvent();
  }

  event: Event;
  getEvent(){
  	var id = this.route.snapshot.params['id'];
  	this.eventService.getEvent(id)
  	      .subscribe(event=>{
  	      	this.event = event;
  	      })
  }

   goBack(){
   	this.router.navigate(['/home']);
   }
}
