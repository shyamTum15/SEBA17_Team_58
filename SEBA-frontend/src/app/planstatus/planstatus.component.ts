import { Component, OnInit } from '@angular/core';
import {EventService} from '../event.service';
import {Event} from '../event';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AppGlobals} from '../app-routing.module';

@Component({
  selector: 'app-planstatus',
  templateUrl: './planstatus.component.html',
  styleUrls: ['./planstatus.component.css']
})
export class PlanStatusComponent implements OnInit {

  constructor(
    public eventService: EventService,
    public route: ActivatedRoute,
    public router: Router,
    public appglobals: AppGlobals
  ) { }

  ngOnInit() {
    this.getEvent();
  }
  event: Event;
  getEvent() {
    var id = this.route.snapshot.params['id'];
    this.eventService.getEvent(id)
      .subscribe(event => {
        this.event = event;
      })
  }

  /* Invoked when the add-button is clicked. Retrieves the user input
  from the input form and adds it to the status-array of the event.
  Resets the input-field after item has been added*/
  addStatus() {
    var newItem = (<HTMLInputElement>document.getElementById("newItem")).value;
    if (newItem != null || newItem != "") {
    /*  this.getEvent(); */
      var model = this.event;
      var id = this.route.snapshot.params['id'];
      model.status.push("0"+newItem);
      this.eventService.updateEvent(id, model).subscribe();
    }
    (<HTMLInputElement>document.getElementById("newItem")).value = "";
  }

  hideWhenParent() {
    if (this.appglobals.getUserGlobal().role.toString() == "Teacher") {
      return true;
    }
    if (this.appglobals.getUserGlobal().role.toString() == "Parent") {
      return false;
    } else {
      return false;
    }
  }

  remove(i) {
  /*  this.getEvent(); */
    var model = this.event;
    var id = this.route.snapshot.params['id'];
    model.status.splice(i, 1);
    this.eventService.updateEvent(id, model).subscribe();
  }


/* @params i: the index of the item within the status array
@params item: the string representation of the status item*/
  changeStatus(i, item){
    if(this.appglobals.getUserGlobal().role=="Teacher"){
    var flag = item[0]; /* the first character of the string is the flag, 0=undone, 1=done */
    var elemID = 'item_'+i; /* calculates the id of the DOM element of the item */
    if(flag==0){
      var newStatus = "1"+item.substr(1,item.length);
      var model = this.event;
      var id = this.route.snapshot.params['id'];
      model.status.splice(i,1,newStatus);
      this.eventService.updateEvent(id, model).subscribe();
    }
    if(flag==1){
      var newStatus = "0"+item.substr(1,item.length);
      var model = this.event;
      var id = this.route.snapshot.params['id'];
      model.status.splice(i,1,newStatus);
      this.eventService.updateEvent(id, model).subscribe();
    }
  }
}

}
