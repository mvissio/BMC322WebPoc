import { Component, OnInit } from '@angular/core';
import { CommonsService } from 'src/app/services/commons.service';
import { Router } from '@angular/router';
declare var dbr: any;
@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {
  scanner: any;

  constructor(private router: Router, private commonsService: CommonsService) {}

  ngOnInit() {
    const imgDni = localStorage.getItem('imgDni'); // imagen64
    const imgDniDorso = localStorage.getItem('imgDniDorso');
    dbr.licenseKey =
      't0068NQAAACLXANtkbkqiXyqxKLgs4E96lS/m0s/4I3VNy1EhUBcqD84+8iWXS9CbBmmp3+qSxewQfSLBmPTiimqF1MEjhr8=';

    let codeReaded = this.getDataImage(imgDni);
    // if (!codeReaded) {
    //   codeReaded = this.getReadCodeBar(imgDniDorso);
    // }
    // if (!codeReaded) {
    //   localStorage.setItem('result', 'no se leyó el código de barra');
    // }

    // this.router.navigate(['result']);
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
  async getDataImage(imgToRead) {
    return await dbr
      .createInstance()
      .then(reader => {
        console.log(reader);
        console.log(imgToRead);
        return reader.decodeBase64String(imgToRead);
      })
      .then(data => {
        console.log(data);
      });
  }

  // getReadCodeBar(imgToRead) {
  //   dbr
  //     .createInstance()
  //     .then(reader => reader.decode(imgToRead))
  //     .then(r => {
  //       console.log('result=', r);
  //       // si encontró un código de barra
  //       if (r.length > 0) {
  //         const rr = r[0];
  //         console.log('result0=', r[0]);

  //         const strMsg = rr.BarcodeText;

  //         console.log('datos=', strMsg);
  //         const codigo = strMsg.split('@');
  //         // length=9 00384052743@CORTEZ LO DUCA@AGOSTINA@F@54692573@A@12/06/2015@06/07/2015@276
  //         // length=17  @25984618    @A@1@LO DUCA@NATALIA GEORGINA@ARGENTINA@18/06/1977@F@04/01/2012@00087712904@7013 @04/01/2027@61@0@ILR:2.20 C:110927.01 (GM/EXE-MOVE-HM)@UNIDAD #13 || S/N: 0040>2008>>0010

  //         if (codigo.length > 0) {
  //           console.log('length=' + codigo.length);
  //           // dni nuevo
  //           let tramite = codigo[0].trim();
  //           let dni = codigo[4].trim();
  //           let sexo = codigo[3].trim();
  //           // dni viejo
  //           if (codigo.length > 10) {
  //             tramite = codigo[10].trim();
  //             dni = codigo[1].trim();
  //             sexo = codigo[8].trim();
  //           }

  //           console.log('datos dni sexo tramite=', dni, sexo, tramite);
  //           if (dni && sexo && tramite) {
  //             this.commonsService
  //               .getRenaperPerson(dni, sexo, tramite)
  //               .subscribe(res => {
  //                 localStorage.setItem('result', JSON.stringify(res));
  //                 console.log('resultado del servicio:', res);
  //                 // this.scanner.close();
  //               });
  //             return true;
  //           }
  //         }
  //       }
  //       return false;
  //     });
  //   return false;
  // }
  openScanner() {
    this.scanner.open();
  }
}