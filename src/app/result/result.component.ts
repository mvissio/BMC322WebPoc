import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  content: any;
  constructor() {}

  ngOnInit() {
    this.content = {
      code: 10001,
      message: 'Exito',
      person: {
        number: '25984618',
        gender: 'F',
        countryBirth: 'ARGENTINA'
      },
      valid: 'Vigente'
    };

    this.content = JSON.parse(localStorage.getItem('result'));
    console.log(this.content);
  }
}
