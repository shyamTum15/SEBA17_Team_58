import { Component, OnInit } from '@angular/core';
import {EventService} from '../event.service';
import {Event} from '../event';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AppGlobals} from '../app-routing.module';

@Component({
  selector: 'app-comments',
  templateUrl: './commentbox.component.html',
  styleUrls: ['./commentbox.component.css']
})
export class CommentBoxComponent implements OnInit {

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

addComment(){
  var newItem = Date() +" "+ this.appglobals.getUserGlobal().name.toString() + ": " + (<HTMLInputElement>document.getElementById("comment")).value;
  if (newItem != null || newItem != "") {
    var model = this.event;
    var id = this.route.snapshot.params['id'];
    model.comments.push(newItem);
    this.eventService.updateEvent(id, model).subscribe();
  }
  (<HTMLInputElement>document.getElementById("comment")).value = "";
}

}
