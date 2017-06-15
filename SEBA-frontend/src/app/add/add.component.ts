import { Component, OnInit } from '@angular/core';

import {EventService} from '../event.service';
import {Event} from '../event';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(
  	  public eventService:EventService,
      public route:ActivatedRoute,
      public router:Router
     ) { }

  ngOnInit() {
  }

  model = new Event();
  addEvent(){
  	this.eventService.addEvent(this.model)
  	     .subscribe(()=>this.goBack())
  }

  goBack(){
   	this.router.navigate(['/home']);
   }

}
