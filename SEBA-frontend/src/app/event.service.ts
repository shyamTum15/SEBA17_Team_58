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

  getEventEmails(){
    return this.http.get("http://localhost:3000/api/eventEmails")
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

<<<<<<< HEAD
  partialUpdateEvent(id,info){
    return this.http.patch("http://localhost:3000/api/events/"+id,info)
          .map(res => res.json());
=======
  sendNotification(parentEmail,userEmail,modelId){
    console.log("I am in sendNotification in routes parentEmail: ",parentEmail);
    console.log("I am in sendNotification in routes userEmail: ",userEmail);
    console.log("I am in sendNotification in routes modelId: ",modelId);
    return this.http.post("http://localhost:3000/api/events/sendmail/"+parentEmail+"/"+userEmail+"/"+modelId,parentEmail,userEmail);
>>>>>>> 22704e118056646aa29f5dff41b32c1a511099c4
  }

}
