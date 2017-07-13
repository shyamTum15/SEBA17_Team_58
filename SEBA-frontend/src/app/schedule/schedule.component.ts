import { Component, OnInit } from '@angular/core';
import {EventService} from '../event.service';
import {Event} from '../event';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AppGlobals} from '../app-routing.module';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

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

  /* Invoked when edit-Button is clicked. Element containing the description
  is transformed into an editable text field.
  Enables the save and cancel buttons and removes the edit-button. */
  editScheduleText() {
    document.getElementById("scheduleText").className = "form-group";
    document.getElementById("scheduleText").setAttribute("contenteditable", "true");
    document.getElementById("editScheduleButton").style.display = 'none';
    document.getElementById("saveScheduleButton").style.display = '';
    document.getElementById("cancelScheduleButton").style.display = '';
    this.getEvent();
  }

  /* Invoked when the cancel-button is clicked.
   Cancels the change of the description.
  Removes the save and save-button and displays the edit-button. */
  cancelScheduleEdit() {
    document.getElementById("editScheduleButton").style.display = '';
    document.getElementById("saveScheduleButton").style.display = "none";
    document.getElementById("cancelScheduleButton").style.display = "none";
    document.getElementById("scheduleText").className="";
    document.getElementById("scheduleText").setAttribute("contenteditable", "false");
    document.getElementById("scheduleText").innerHTML = this.event.schedule;
  }

  /* Persists the new event infotext.
  Transfers the description box back into an uneditable text field.
  Hides the save and cancel buttons and displays the edit buttons. */
  saveScheduleEdit() {
    console.log("[schedule] infotext Before getEvent(): " + this.event.infotext);
    console.log("[schedule] schedule Before getEvent(): " + this.event.schedule);
    this.getEvent();
    console.log("[schedule] infotext after getEvent(): " + this.event.infotext);
    console.log("[schedule] schedule after getEvent(): " + this.event.schedule);
    var newDescr = document.getElementById("scheduleText").innerHTML;
    var id = this.route.snapshot.params['id'];
    var model = this.event;
    model.schedule = newDescr;
    this.event = model;
    this.eventService.updateEvent(id, model).subscribe();
    this.getEvent();
    console.log("[schedule] infotext after getEvent() and update: " + this.event.infotext);
    console.log("[schedule] schedule after getEvent() and update: " + this.event.schedule);
    document.getElementById("scheduleText").className="";
    document.getElementById("scheduleText").setAttribute("contenteditable", "false");
    document.getElementById("editScheduleButton").style.display = '';
    document.getElementById("saveScheduleButton").style.display = "none";
    document.getElementById("cancelScheduleButton").style.display = "none";
    document.getElementById("scheduleText").innerHTML = newDescr;
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
}
