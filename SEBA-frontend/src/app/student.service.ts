import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';           ////extension to use the map function

@Injectable()
export class StudentService {

  constructor(private http:Http) { }

  getStudents(){
  	return this.http.get("http://localhost:3000/api/students")
  	     .map(res => res.json());
  }

  addStudent(info){
  	return this.http.post("http://localhost:3000/api/students",info)
  	     .map(res => res.json());
  }

  getStudent(id){
  	return this.http.get("http://localhost:3000/api/students/"+id)
  	     .map(res => res.json());
  }

  getStudentsByClass(clss){
    console.log("within student service class: ",clss);
    return this.http.get("http://localhost:3000/api/students/"+clss)
         .map(res => res.json());
  }

  deleteStudent(id){
  	return this.http.delete("http://localhost:3000/api/students/"+id)
  	     .map(res => res.json());
  }

  updateStudent(id,info){
  	return this.http.put("http://localhost:3000/api/students/"+id,info)
  	     .map(res => res.json());
  }

}
