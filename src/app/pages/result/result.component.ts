import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  content: any;
  contentFace: any;
  typeOfString: boolean;
  typeOfStringFace: boolean;
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
    let result = localStorage.getItem('resultDNI');

    this.typeOfString = typeof result === 'string';
    this.content = this.typeOfString ? result : JSON.parse(result);

    result = localStorage.getItem('resultFace');
    if (result) {
      this.typeOfStringFace = typeof result === 'string';
      this.contentFace = this.typeOfStringFace ? result : JSON.parse(result);
    }
  }
  goDni() {
    this.router.navigate(['dni']);
  }

  goToNext() {
    this.router.navigate(['faceapi']);
  }
}
