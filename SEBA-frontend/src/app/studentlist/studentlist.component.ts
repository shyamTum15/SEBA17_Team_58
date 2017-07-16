import { Component, OnInit } from '@angular/core';
import {EventService} from '../event.service';
import {Event} from '../event';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Student} from '../student';
import {StudentService} from '../student.service';
import {UserService} from '../user.service';
import {User} from '../user';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentListComponent implements OnInit {

  constructor(
    public eventService: EventService,
    public route: ActivatedRoute,
    public router: Router,
    public studentService: StudentService,
  ) { }

  ngOnInit() {
    this.getEvent();
    this.getStudentByClass();
  }
  event: Event;
  model = new Student();
  modelStudent = new Student();

  getEvent() {
    var id = this.route.snapshot.params['id'];
    this.eventService.getEvent(id)
      .subscribe(event => {
        this.event = event;
      })
  }

  addStudent() {
    this.studentService.addStudent(this.model)
      .subscribe();
      document.forms["addStudentForm"].reset();
      }

  getStudentByClass() {
    var clss = this.event.class;
    this.studentService.getStudentsByClass(clss)
      .subscribe(student => {
        this.modelStudent = student;
      });
  }

}
