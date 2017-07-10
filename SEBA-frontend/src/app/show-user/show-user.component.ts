import { Component, OnInit } from '@angular/core';

import {UserService} from '../user.service';
import {User} from '../user';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {

  constructor(
     public userService:UserService,
     public route:ActivatedRoute,
     public router:Router
  	) { }

  ngOnInit() {
  	this.getUser();
  }

  user: User;
  getUser(){
  	var id = this.route.snapshot.params['id'];
  	console.log('id: ',id);
  	this.userService.getUser(id)
  	      .subscribe(user=>{
  	      	this.user = user;
  	      })
  }

  goBack(){
   	this.router.navigate(['/home']);
   }

}
