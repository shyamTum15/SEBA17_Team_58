import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';           ////extension to use the map function

@Injectable()
export class UserService {

  constructor(private http:Http) { }

  getUsers(){
  	return this.http.get("http://localhost:3000/api/users")
  	     .map(res => res.json());
  }

  addUser(info){
  	return this.http.post("http://localhost:3000/api/users",info)
  	     .map(res => res.json());
  }

  authenticateUser(info){
    console.log("I am in front end route + info",info);
    return this.http.post("http://localhost:3000/api/users/login",info)
         .map(res => res.json());
  }

  logOutUser(){
    console.log("in frontend, going to backend");
    return this.http.get("http://localhost:3000/api/users/logout")
         .map(res => res.json());
  }

  getUser(id){
  	return this.http.get("http://localhost:3000/api/users/"+id)
  	     .map(res => res.json());
  }

  deleteUser(id){
  	return this.http.delete("http://localhost:3000/api/users/"+id)
  	     .map(res => res.json());
  }

  updateUser(id,info){
  	return this.http.put("http://localhost:3000/api/users/"+id,info)
  	     .map(res => res.json());
  }

}