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
    const imgDniDorso = localStorage.getItem('imgDniDorso');
    dbr.licenseKey =
      't0068NQAAACLXANtkbkqiXyqxKLgs4E96lS/m0s/4I3VNy1EhUBcqD84+8iWXS9CbBmmp3+qSxewQfSLBmPTiimqF1MEjhr8=';

    let codeReaded = this.getReadCodeBar(imgDni);
    if (!codeReaded) {
      codeReaded = this.getReadCodeBar(imgDniDorso);
    }
    if (!codeReaded) {
      localStorage.setItem('result', 'no se leyó el código de barra');
    }

    this.router.navigate(['result']);
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
  getReadCodeBar(imgToRead) {
    dbr
      .createInstance()
      .then(reader => reader.decode(imgToRead))
      .then(r => {
        const myImg = imgToRead;
        const BODY = {
          files: { img: { data: myImg } }
        };
        console.log('body:', BODY);

        const resultadoFace = this.http.post(
          `https://desolate-fortress-69862.herokuapp.com/detectDocument`,
          BODY
        );
        console.log('es documento?=', resultadoFace);

        console.log('result=', r);
        // si encontró un código de barra
        if (r.length > 0) {
          const rr = r[0];
          console.log('result0=', r[0]);

          const strMsg = rr.BarcodeText;

          console.log('datos=', strMsg);
          const codigo = strMsg.split('@');
          // length=9 00384052743@CORTEZ LO DUCA@AGOSTINA@F@54692573@A@12/06/2015@06/07/2015@276
          // length=17  @25984618    @A@1@LO DUCA@NATALIA GEORGINA@ARGENTINA@18/06/1977@F@04/01/2012@00087712904@7013 @04/01/2027@61@0@ILR:2.20 C:110927.01 (GM/EXE-MOVE-HM)@UNIDAD #13 || S/N: 0040>2008>>0010

          if (codigo.length > 0) {
            console.log('length=' + codigo.length);
            // dni nuevo
            let tramite = codigo[0].trim();
            let dni = codigo[4].trim();
            let sexo = codigo[3].trim();
            // dni viejo
            if (codigo.length > 10) {
              tramite = codigo[10].trim();
              dni = codigo[1].trim();
              sexo = codigo[8].trim();
            }

            console.log('datos dni sexo tramite=', dni, sexo, tramite);
            if (dni && sexo && tramite) {
              this.getRenaperPerson(dni, sexo, tramite).subscribe(res => {
                localStorage.setItem('result', JSON.stringify(res));
                console.log('resultado del servicio:', res);
                // this.scanner.close();
              });
              return true;
            }
          }
        }
        return false;
      });
    return false;
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
  getRenaperFace(numberTxt, genderTxt, imgTxt) {
    const BODY = {
      number: numberTxt,
      gender: genderTxt,
      img: imgTxt
    };
    console.log('body:', BODY);
    return this.http.post(
      `https://desolate-fortress-69862.herokuapp.com/face`,
      BODY
    );
  }
  openScanner() {
    this.scanner.open();
  }
}
