import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonRenaper, ResponseRenaper } from '../../inteface/model.inteface';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  content: ResponseRenaper;
  person: PersonRenaper;
  contentFace;
  typeOfString: boolean;
  typeOfStringFace: boolean;
  selfieSRC;
  imgDNISRC;
  imgDNIDorsoSRC;
  constructor(private router: Router) {}

  ngOnInit() {
    const result = localStorage.getItem('resultDNI');
    this.selfieSRC = localStorage.getItem('Selfie');
    this.imgDNIDorsoSRC = localStorage.getItem('imgDNIDorso');
    this.imgDNISRC = localStorage.getItem('imgDNI');
    this.content = JSON.parse(result);

    const resultFace = localStorage.getItem('resultFace');
    if (result) {
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
