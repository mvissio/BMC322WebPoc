import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  content: any;
  typeOfString: boolean;
  constructor(private router: Router) {}

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

    this.content = this.typeOfString ? result : JSON.parse(result);
    this.typeOfString = typeof this.content === 'string';
  }
  goDni() {
    this.router.navigate(['dni']);
  }
}
