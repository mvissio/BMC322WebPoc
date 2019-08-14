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
  selfieSRC;
  imgDNISRC;
  imgDNIDorsoSRC;
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
    const result = localStorage.getItem('resultDNI');
    this.selfieSRC = localStorage.getItem('Selfie');
    this.imgDNIDorsoSRC = localStorage.getItem('imgDNIDorso');
    this.imgDNISRC = localStorage.getItem('imgDNI');
    this.typeOfString = false;
    this.content = JSON.parse(result);

    const resultFace = localStorage.getItem('resultFace');
    if (result) {
      this.typeOfStringFace = false;
      this.contentFace = JSON.parse(resultFace);
    }
  }
  goDni() {
    this.router.navigate(['dni']);
  }

  goToNext() {
    this.router.navigate(['faceapi']);
  }
}