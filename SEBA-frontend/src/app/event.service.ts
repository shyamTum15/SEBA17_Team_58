import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';           ////extension to use the map function

@Injectable()
export class EventService {

  constructor(private http:Http) { }

  getEvents(){
  	return this.http.get("http://localhost:3000/api/events")
  	     .map(res => res.json());
  }

  addEvent(info){
  	return this.http.post("http://localhost:3000/api/events",info)
  	     .map(res => res.json());
  }

  getEvent(id){
  	return this.http.get("http://localhost:3000/api/events/"+id)
  	     .map(res => res.json());
  }

  deleteEvent(id){
  	return this.http.delete("http://localhost:3000/api/events/"+id)
  	     .map(res => res.json());
  }

  updateEvent(id,info){
  	return this.http.put("http://localhost:3000/api/events/"+id,info)
  	     .map(res => res.json());
  }

}
