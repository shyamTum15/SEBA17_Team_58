import { Component, OnInit } from '@angular/core';

import {EventService} from '../event.service';
import {Event} from '../event';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AppEventId} from '../app-routing.module';
import { Inject } from "@angular/core";
import {forwardRef} from "@angular/core";

@Component({
  selector: 'app-check-modal',
  templateUrl: './check-modal.component.html',
  styleUrls: ['./check-modal.component.css']
})
export class CheckModalComponent implements OnInit {

  constructor(
     public eventService:EventService,
     public route:ActivatedRoute,
     public router:Router,
     @Inject(forwardRef(() => AppEventId)) public appEventId: AppEventId
  	) { 
   
  }

  ngOnInit() {
  }

  enteredEventval;

  checkMatchEvent(){
  	this.appEventId.setEnteredEventId(this.enteredEventval);
  	console.log("from check-modal this.enteredEventval ", this.enteredEventval);
    this.router.navigate(['/home']);
  }

}
