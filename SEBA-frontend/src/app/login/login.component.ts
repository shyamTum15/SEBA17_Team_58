import { Component, OnInit } from '@angular/core';

import {UserService} from '../user.service';
import {User} from '../user';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
     public userService:UserService,
     public route:ActivatedRoute,
     public router:Router
  	) { }

  ngOnInit() {
  }

  model = new User();
  addUser(){
  	this.userService.addUser(this.model)
  	     .subscribe(()=>this.goBack())
  }

  goBack(){
   	this.router.navigate(['/home']);
   }

}
