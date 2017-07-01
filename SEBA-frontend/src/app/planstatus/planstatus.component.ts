import { Component, OnInit } from '@angular/core';
import {EventService} from '../event.service';
import {Event} from '../event';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-planstatus',
  templateUrl: './planstatus.component.html',
  styleUrls: ['./planstatus.component.css']
})
export class PlanStatusComponent implements OnInit {

  constructor(
    public eventService: EventService,
    public route: ActivatedRoute,
    public router: Router
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
      var model = this.event;
      var id = this.route.snapshot.params['id'];
      model.status.push(newItem);
      this.eventService.updateEvent(id, model).subscribe();
    }
  (<HTMLInputElement>document.getElementById("newItem")).value = "";
  }

}
