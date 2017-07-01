import { Component, OnInit } from '@angular/core';
import {EventService} from '../event.service';
import {Event} from '../event';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-editdescription',
  templateUrl: './editdescription.component.html',
  styleUrls: ['./editdescription.component.css']
})
export class EditDescriptionComponent implements OnInit {

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

  /* Invoked when edit-Button is clicked. Element containing the description
  is transformed into an editable text field.
  Enables the save and cancel buttons and removes the edit-button. */
  editText() {
    document.getElementById("textDescr").className = "form-group";
    document.getElementById("textDescr").setAttribute("contenteditable", "true");
    document.getElementById("editButton").style.display = 'none';
    document.getElementById("saveButton").style.display = '';
    document.getElementById("cancelButton").style.display = '';
  }

  /* Invoked when the cancel-button is clicked.
   Cancels the change of the description.
  Removes the save and save-button and displays the edit-button. */
  cancelEdit() {
    document.getElementById("editButton").style.display = '';
    document.getElementById("saveButton").style.display = "none";
    document.getElementById("cancelButton").style.display = "none";
    document.getElementById("textDescr").className="";
    document.getElementById("textDescr").setAttribute("contenteditable", "false");
    document.getElementById("textDescr").innerHTML = this.event.infotext;
  }

  /* Persists the new event infotext.
  Transfers the description box back into an uneditable text field.
  Hides the save and cancel buttons and displays the edit buttons. */
  saveEdit() {
    var newDescr = document.getElementById("textDescr").innerHTML;
    var id = this.route.snapshot.params['id'];
    var model = this.event;
    model.infotext = newDescr;
    this.eventService.updateEvent(id, model).subscribe();
    document.getElementById("textDescr").className="";
    document.getElementById("textDescr").setAttribute("contenteditable", "false");
    document.getElementById("editButton").style.display = '';
    document.getElementById("saveButton").style.display = "none";
    document.getElementById("cancelButton").style.display = "none";
  }

}
