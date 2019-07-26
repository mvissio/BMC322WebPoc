import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ResultComponent } from '../result/result.component';

const dbr = (window as any).dbr;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'dbr-cdn-angular-default';

  constructor(private http: HttpClient, private router: Router) {}
  scanner: any;
  ngOnInit() {
    const imgDni = localStorage.getItem('imgDni'); // imagen64
    dbr.licenseKey =
      't0068NQAAACLXANtkbkqiXyqxKLgs4E96lS/m0s/4I3VNy1EhUBcqD84+8iWXS9CbBmmp3+qSxewQfSLBmPTiimqF1MEjhr8=';
    dbr
      .createInstance()
      .then(reader => reader.decode(imgDni))
      .then(r => {
        console.log('result=', r);
        const rr = r[0];
        console.log('result0=', r[0]);

        const strMsg = rr.BarcodeText;

        console.log('datos=', strMsg);
        const codigo = strMsg.split('@');
        const tramite = codigo[10].trim();
        const dni = codigo[1].trim();
        const sexo = codigo[8].trim();
        console.log('datos dni sexo tramite=', dni, sexo, tramite);
        if (dni && sexo && tramite) {
          this.getRenaperPerson(dni, sexo, tramite).subscribe(res => {
            localStorage.setItem('result', JSON.stringify(res));
            console.log('resultado del servicio:', res);
            // this.scanner.close();
            this.router.navigate(['result']);
          });
        }
      });

    // https://www.dynamsoft.com/help/Barcode-Reader-JS/JS/methodreadBase64.html
    /*this.scanner = new dbr.Scanner({
      onFrameRead: results => {
        if (results.length > 0) {
          console.log('results', results);
        }
      }, // eslint-disable-line
      onNewCodeRead: (txt, result) => {
        const codigo = txt.split('@');
        const tramite = codigo[10].trim();
        const dni = codigo[1].trim();
        const sexo = codigo[8].trim();

        this.getRenaperPerson(dni, sexo, tramite).subscribe(res => {
          localStorage.setItem('result', JSON.stringify(res));
          console.log('resultado del servicio:', res);
          this.scanner.close();
          this.router.navigate(['result']);
        });
      }
    });*/
  }

  getRenaperPerson(numberTxt, genderTxt, orderTxt) {
    const BODY = {
      number: numberTxt,
      gender: genderTxt,
      order: orderTxt
    };
    console.log('body:', BODY);
    return this.http.post(
      `https://desolate-fortress-69862.herokuapp.com/person`,
      BODY
    );
  }
  getRenaperFace() {
    const BODY = {
      number: '25984618',
      gender: 'F',
      order: '00087712904'
    };
    return this.http.get(`https://desolate-fortress-69862.herokuapp.com/face`);
  }
  openScanner() {
    this.scanner.open();
  }
}
