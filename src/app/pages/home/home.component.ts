import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ResultComponent } from '../result/result.component';
import { CommonsService } from '../../services/commons.service';

const dbr = (window as any).dbr;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'dbr-cdn-angular-default';
  scanner: any;

  constructor(private router: Router, private commonsService: CommonsService) {}

  ngOnInit() {
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

  openScanner() {
    this.scanner.open();
  }
}
