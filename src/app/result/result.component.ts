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
    const result = localStorage.getItem('result');
    this.content = typeof result === 'string' ? result : JSON.parse(result);
    console.log(this.content);
  }
}
