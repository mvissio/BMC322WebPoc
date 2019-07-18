import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const dbr = (window as any).dbr;
dbr.licenseKey =
  't0068NQAAACLXANtkbkqiXyqxKLgs4E96lS/m0s/4I3VNy1EhUBcqD84+8iWXS9CbBmmp3+qSxewQfSLBmPTiimqF1MEjhr8=';

const scanner = new dbr.Scanner({
  onFrameRead: results => {
    if (results.length > 0) {
      console.log(results);
    }
  }, // eslint-disable-line
  onNewCodeRead: (txt, result) => {
    // let codigo = txt.split('@');
    // pasar como parametro al servicio...
    alert(txt);
    /*
    let tramite = codigo[10];
    let dni = codigo[1];
    let sexo = codigo[8];

    };
    */
    /*   codigo =
      "@25984618    @A@1@LO DUCA@NATALIA GEORGINA@ARGENTINA@18-06-1977@F@04-01-2012@00087712904@7013 @04-01-2027@61@0@ILRÑ2.20 CÑ110927.01 )GM-EXE'MOVE'HM=@UNIDAD #13 ]] S-NÑ 0040:2008::0010";
   */
  } // eslint-disable-line
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dbr-cdn-angular-default';
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getRenaperPerson().subscribe(res => {
      console.log(res);
    });
    /*this.getRenaperFace().subscribe(res => {
      console.log(res);
    });*/
  }
  getRenaperPerson() {
    const BODY = {
      number: '25984618',
      gender: 'F',
      order: '00087712904'
    };

    return this.http.post(`http://192.168.0.108:3000/person`, BODY);
  }
  getRenaperFace() {
    const BODY = {
      number: '25984618',
      gender: 'F',
      order: '00087712904'
    };
    return this.http.get(`http://localhost:3000/face`);
  }
  openScanner() {
    scanner.open();
  }
}
