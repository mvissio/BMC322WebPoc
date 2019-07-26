import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
        console.log(r);
      });
    // https://www.dynamsoft.com/help/Barcode-Reader-JS/JS/methodreadBase64.html
    /* var result = dbrObject.readBase64("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");

// Show barcode results
var count = result.getCount();
var strMsg = "";
if(count > 0) {
    for (var i = 0; i < count; i++){
        strMsg +="Index: " + i + "\n";
        strMsg +="Barcode Type: " + result.get(i).formatString + "\n";
        strMsg +="Barcode Value: " + result.get(i).text + "\n";
    }
    alert(strMsg);
}
else {
    alert("No barcode(s) found.");
}*/
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
