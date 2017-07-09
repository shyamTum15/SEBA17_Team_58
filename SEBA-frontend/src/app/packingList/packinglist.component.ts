import { Component, OnInit } from '@angular/core';
import {EventService} from '../event.service';
import {Event} from '../event';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AppGlobals} from '../app-routing.module';

@Component({
  selector: 'app-packinglist',
  templateUrl: './packinglist.component.html',
  styleUrls: ['./packinglist.component.css']
})
export class PackingListComponent implements OnInit {

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
  addPackingItem() {
    var newItem = (<HTMLInputElement>document.getElementById("newPackingItem")).value;
    if (newItem != null || newItem != "") {
      this.getEvent();
      var model = this.event;
      var id = this.route.snapshot.params['id'];
      model.packing.push(newItem);
      this.eventService.updateEvent(id, model).subscribe();
    }
    (<HTMLInputElement>document.getElementById("newPackingItem")).value = "";
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
    this.getEvent();
    var model = this.event;
    var id = this.route.snapshot.params['id'];
    model.packing.splice(i, 1);
    this.eventService.updateEvent(id, model).subscribe();
  }

}
