import { Component, OnInit } from '@angular/core';

const dbr = (window as any).dbr;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dbr-cdn-angular-default';
  constructor() {}
  ngOnInit() {}
}
