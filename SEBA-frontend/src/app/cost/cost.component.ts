import { Component, OnInit } from '@angular/core';
import {EventService} from '../event.service';
import {Event} from '../event';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AppGlobals} from '../app-routing.module';

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.css']
})
export class CostComponent implements OnInit {

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

  editCost() {
    document.getElementById("cost").className = "form-group";
    document.getElementById("cost").setAttribute("contenteditable", "true");
    document.getElementById("cost").style.background = "white";
    document.getElementById("cost").style.border = "1px black solid"
    document.getElementById("editCostButton").style.display = 'none';
    document.getElementById("saveCostButton").style.display = '';
    document.getElementById("cancelCostButton").style.display = '';
    this.getEvent();
  }

  cancelCostEdit() {
    document.getElementById("editCostButton").style.display = '';
    document.getElementById("saveCostButton").style.display = "none";
    document.getElementById("cancelCostButton").style.display = "none";
    document.getElementById("cost").className="";
    document.getElementById("cost").setAttribute("contenteditable", "false");
    document.getElementById("cost").style.background = "none";
    document.getElementById("cost").style.border = "none"
    document.getElementById("cost").innerHTML = this.event.cost[0];
  }

  saveCostEdit() {
    var newCost = document.getElementById("cost").innerText;
    var id = this.route.snapshot.params['id'];
    var model = this.event;
    model.cost[0] = newCost;
    this.eventService.updateEvent(id, model).subscribe();
    document.getElementById("cost").className="";
    document.getElementById("cost").setAttribute("contenteditable", "false");
    document.getElementById("editCostButton").style.display = '';
    document.getElementById("saveCostButton").style.display = "none";
    document.getElementById("cancelCostButton").style.display = "none";
    document.getElementById("cost").style.background = "none";
    document.getElementById("cost").style.border = "none"
    document.getElementById("cost").innerHTML = newCost;
  }

  editDescr() {
    document.getElementById("costDescr").className = "form-group";
    document.getElementById("costDescr").style.background = "white";
    document.getElementById("costDescr").style.border = "1px black solid"
    document.getElementById("costDescr").setAttribute("contenteditable", "true");
    document.getElementById("editDescrButton").style.display = 'none';
    document.getElementById("saveDescrButton").style.display = '';
    document.getElementById("cancelDescrButton").style.display = '';
    this.getEvent();
  }

  cancelDescrEdit() {
    document.getElementById("editDescrButton").style.display = '';
    document.getElementById("saveDescrButton").style.display = "none";
    document.getElementById("cancelDescrButton").style.display = "none";
    document.getElementById("costDescr").className="";
    document.getElementById("costDescr").style.background = "none";
    document.getElementById("costDescr").style.border = "none"
    document.getElementById("costDescr").setAttribute("contenteditable", "false");
    document.getElementById("costDescr").innerHTML = this.event.cost[1];
  }

  saveDescrEdit() {
    var newCost = document.getElementById("costDescr").innerText;
    var id = this.route.snapshot.params['id'];
    var model = this.event;
    model.cost[1] = newCost;
    this.eventService.updateEvent(id, model).subscribe();
    document.getElementById("costDescr").className="";
    document.getElementById("costDescr").style.background = "none";
    document.getElementById("costDescr").style.border = "none"
    document.getElementById("costDescr").setAttribute("contenteditable", "false");
    document.getElementById("editDescrButton").style.display = '';
    document.getElementById("saveDescrButton").style.display = "none";
    document.getElementById("cancelDescrButton").style.display = "none";
    document.getElementById("costDescr").innerHTML = newCost;
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
