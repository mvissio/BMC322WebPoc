import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonsService } from 'src/app/services/commons.service';
import { IAwsResponse } from '../../inteface/model.inteface';
import { CONST_AWS } from '../../const/const';
const dbr = (window as any).dbr;

@Component({
  selector: 'app-dni',
  templateUrl: './dni.component.html',
  styleUrls: ['./dni.component.scss']
})
export class DniComponent implements OnInit {
  @Output()
  public pictureTaken = new EventEmitter<WebcamImage>();

  // toggle webcam on/off
  public showWebcam = true;
  public deviceId: string;
  public errors: WebcamInitError[] = [];
  webcamImageF;
  webcamImageFView = false;
  switched = false;
  legend1 = true;
  allowCameraSwitch = true;
  multipleWebcamsAvailable = false;
  public width: any;
  public heith: any;
  imgDNI: string;
  imgDNIDorso: string;
  codeReaded: any;
  detecto = false;
  imageType = 'image/jpeg';
  subscribePerson: any;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();

  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };

  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();
  constructor(
    private router: Router,
    private http: HttpClient,
    private commonsService: CommonsService
  ) {}
  public ngOnInit(): void {
    this.width = window.innerWidth;
    this.heith = window.innerHeight;

    // localStorage.clear();
  }

  public triggerSnapshot(): void {
    setTimeout(function() {
      if (this.trigger) {
        this.trigger.next();
      }
    }, 2000);
  }
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }
  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
    this.triggerSnapshot();
  }
  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
    if (!this.switched) {
      this.switched = true;
      this.showNextWebcam(false);
    }
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
  public handleImage(webcamImage: WebcamImage): void {
    dbr.licenseKey =
      't0068NQAAACLXANtkbkqiXyqxKLgs4E96lS/m0s/4I3VNy1EhUBcqD84+8iWXS9CbBmmp3+qSxewQfSLBmPTiimqF1MEjhr8=';
    this.webcamImageF = webcamImage;

    if (this.legend1) {
      this.imgDNI = this.webcamImageF.imageAsDataUrl;
      localStorage.setItem('imgDNI', this.webcamImageF.imageAsDataUrl);
      this.legend1 = false;
      this.webcamImageFView = true;
      this.detecDocument(this.imgDNI);
      console.log('detecto documento?', this.detecto);
    } else {
      localStorage.setItem('imgDNIDorso', this.webcamImageF.imageAsDataUrl);
      this.imgDNIDorso = this.webcamImageF.imageAsDataUrl;
      this.detecDocument(this.imgDNIDorso);
      console.log('detecto documento?', this.detecto);
    }
    if (this.imgDNI && this.imgDNIDorso) {
      this.pictureTaken.emit(webcamImage);
    }
  }
  detecDocument(img) {
    const detecDocumentSub = this.commonsService
      .detectDocument(img)
      .subscribe((res: Array<IAwsResponse>) => {
        const document: IAwsResponse = res.find(
          r => r.Name === CONST_AWS.DOCUMENT
        );
        const idCards: IAwsResponse = res.find(
          r => r.Name === CONST_AWS.ID_CARDS
        );
        const license: IAwsResponse = res.find(
          r => r.Name === CONST_AWS.LICENSE
        );
        if (
          (document || idCards || license) &&
          (document.Confidence >= 70 ||
            idCards.Confidence >= 70 ||
            license.Confidence >= 70)
        ) {
          this.detecto = true;
          detecDocumentSub.unsubscribe();
        }
        detecDocumentSub.unsubscribe();
        this.detecto = false;
      });
  }
  public goToNext() {
    if (!this.codeReaded) {
      localStorage.setItem('resultDNI', 'no se leyó el código de barra');
    }
    if (!this.codeReaded) {
      this.getReadCodeBar(this.imgDNI, 1);
    }
  }
  public goToNextDorso() {
    if (!this.codeReaded) {
      this.getReadCodeBar(this.imgDNIDorso, 2);
    }
  }
  public goToResult() {
    this.router.navigate(['result']);
  }
  getReadCodeBar(imgToRead, order) {
    dbr
      .createInstance()
      .then(reader => reader.decode(imgToRead))
      .then(async r => {
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
            localStorage.setItem('number', dni);
            localStorage.setItem('gender', sexo);
            if (dni && sexo && tramite) {
              this.subscribePerson = this.commonsService
                .getRenaperPerson(dni, sexo, tramite)
                .subscribe(
                  res => {
                    localStorage.setItem('resultDNI', JSON.stringify(res));
                    console.log('resultado del servicio DNI:', res);
                    this.subscribePerson.unsubscribe();
                    this.codeReaded = true;
                  },
                  () => {
                    console.log('process0');
                    this.goToResult();
                  }
                );
            } else {
              console.log('process1');
              this.nextProcess(order);
            }
          } else {
            console.log('process2');
            this.nextProcess(order);
          }
        } else {
          // TODO: mockeamos datos
          console.log('mockeamos datos al no leer codigo de barra');

          localStorage.setItem(
            'resultDNI',
            JSON.stringify({
              code: 10001,
              message: 'Exito',
              person: {
                number: '25984618',
                gender: 'F',
                names: 'Natalia Georgina',
                lastNames: 'LO DUCA',
                birthdate: '18/06/1977',
                copy: 'A',
                expirationDate: '04/01/2027',
                creationDate: '04/01/2012',
                cuil: '27259846183',
                streetAddress: 'CANGALLO',
                numberStreet: '3011',
                floor: null,
                department: '28',
                zipCode: '5521',
                city: 'VILLA NUEVA',
                municipality: 'GUAYMALLéN',
                province: 'MENDOZA',
                country: 'ARGENTINA',
                messageOfDeath: 'Sin Aviso de Fallecimiento',
                nationality: 'ARGENTINA',
                countryBirth: 'ARGENTINA'
              },
              valid: 'Vigente'
            })
          );
          console.log('process3');
          localStorage.setItem('number', '25984618');
          localStorage.setItem('gender', 'F');
          this.goToResult();
        }
      });
  }
  nextProcess(order) {
    if (order === 1) {
      this.goToNextDorso();
    } else {
      this.goToResult();
    }
  }
}
