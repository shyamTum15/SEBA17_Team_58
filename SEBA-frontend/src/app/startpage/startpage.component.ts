import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})
export class StartPageComponent implements OnInit {

  constructor(
    public route: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit() {
  }

}
