import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonsService {
  constructor(private http: HttpClient) {}
  getRenaperPerson(numberTxt, genderTxt, orderTxt) {
    const body = {
      number: numberTxt,
      gender: genderTxt,
      order: orderTxt
    };
    return this.http.post(
      `https://desolate-fortress-69862.herokuapp.com/person`,
      body
    );
  }

  getRenaperFace(numberTxt, genderTxt, imgTxt) {
    const body = {
      number: numberTxt,
      gender: genderTxt,
      img: imgTxt
    };
    return this.http.post(
      `https://desolate-fortress-69862.herokuapp.com/face`,
      body
    );
  }

  detectDocument(imagen) {
    const body = {
      img: imagen
    };
    return this.http
      .post(
        `https://desolate-fortress-69862.herokuapp.com/detectDocument`,
        body
      )
      .pipe(map((resp: any) => resp.data));
  }

  detectFace(imagen) {
    const body = {
      img: imagen
    };
    return this.http
      .post(
        `https://desolate-fortress-69862.herokuapp.com/detectDocument`,
        body
      )
      .pipe(map((resp: any) => resp.data));
  }

  detectText(imagen) {
    const body = {
      img: imagen
    };
    return this.http
      .post(
        `https://desolate-fortress-69862.herokuapp.com/detectDocument`,
        body
      )
      .pipe(map((resp: any) => resp.data));
  }
}
