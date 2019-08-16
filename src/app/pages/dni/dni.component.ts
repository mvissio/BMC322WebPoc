import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {WebcamImage, WebcamInitError} from 'ngx-webcam';
import {Subject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CommonsService} from 'src/app/services/commons.service';
import {IAwsResponse} from '../../inteface/model.inteface';
import {CONST_AWS} from '../../const/const';

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
  errorMessage: string;
  showCamera: boolean;
  showImage: boolean;
  showErrorCodebar: boolean;
  loading: boolean;
  private trigger: Subject<void> = new Subject<void>();
  public videoOptions: MediaTrackConstraints = {};
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  constructor(
    private router: Router,
    private http: HttpClient,
    private commonsService: CommonsService
  ) {
  }

  public ngOnInit(): void {
    this.width = window.innerWidth;
    this.heith = window.innerHeight;
    this.showCamera = true;
    this.showImage = false;
    this.showErrorCodebar = false;
    this.loading = false;
    dbr.licenseKey =
      't0068NQAAACLXANtkbkqiXyqxKLgs4E96lS/m0s/4I3VNy1EhUBcqD84+8iWXS9CbBmmp3+qSxewQfSLBmPTiimqF1MEjhr8=';
    // localStorage.clear();
  }

  public triggerSnapshot(): void {
    this.trigger.next();
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
    this.nextWebcam.next(directionOrDeviceId);
  }

  public cameraWasSwitched(deviceId: string): void {
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

    this.webcamImageF = webcamImage;
    this.errorMessage = undefined;
    if (this.legend1) {
      localStorage.setItem('imgDNI', this.webcamImageF.imageAsDataUrl);
      this.detecDocument(this.webcamImageF.imageAsDataUrl);
    } else {
      localStorage.setItem('imgDNIDorso', this.webcamImageF.imageAsDataUrl);
      this.detecDocument(this.webcamImageF.imageAsDataUrl);
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
          this.errorMessage = undefined;
          this.showCamera = false;
          this.showImage = true;
        } else {
          this.detecto = false;
          this.errorMessage = 'No se detecto ningun documento. Por favor intente de nuevo.';
        }
      })
      .add(() => detecDocumentSub.unsubscribe());
  }

  public async goToNext() {
    if (this.legend1) {
      this.legend1 = false;
      this.detecto = false;
      this.showCamera = true;
      this.showImage = false;
    } else {
      if (!this.codeReaded) {
        await this.getReadCodeBar(this.imgDNI, 1);
      }
      if (!this.codeReaded) {
        await this.getReadCodeBar(this.imgDNIDorso, 2);
      }
      if (!this.codeReaded) {
        this.showCamera = false;
        this.showImage = false;
        this.errorMessage = undefined;
        this.showErrorCodebar = true;
      }
    }
  }

  public goBack(event) {
    this.detecto = false;
    this.loading = false;
    this.errorMessage = undefined;
    this.showImage = false;
    this.showCamera = true;
    this.legend1 = true;
    this.showErrorCodebar = false;
  }

  public goToNextDorso() {
    if (!this.codeReaded) {
      this.getReadCodeBar(this.imgDNIDorso, 2);
    }
  }

  public goToResult() {
    this.router.navigate(['faceapi']);
  }

  getReadCodeBar(imgToRead, order) {
    dbr
      .createInstance()
      .then(reader => reader.decode(imgToRead))
      .then(r => {
        if (r.length > 0) {
          const rr = r[0];
          const strMsg = rr.BarcodeText;
          const codigo = strMsg.split('@');
          // length=9 00384052743@CORTEZ LO DUCA@AGOSTINA@F@54692573@A@12/06/2015@06/07/2015@276
          // length=17  @25984618    @A@1@LO DUCA@NATALIA GEORGINA@ARGENTINA@18/06/1977@F@04/01/2012@00087712904@7013 @04/01/2027@61@0@ILR:2.20 C:110927.01 (GM/EXE-MOVE-HM)@UNIDAD #13 || S/N: 0040>2008>>0010
          if (codigo.length > 0) {
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
            localStorage.setItem('number', dni);
            localStorage.setItem('gender', sexo);
            if (dni && sexo && tramite) {
              this.subscribePerson = this.commonsService
                .getRenaperPerson(dni, sexo, tramite)
                .subscribe(
                  res => {
                    localStorage.setItem('resultDNI', JSON.stringify(res));
                    console.log('resultado del servicio DNI:', res);
                    this.codeReaded = true;
                  },
                  error => {
                    this.showErrorCodebar = true;
                    this.loading = false;
                    this.showCamera = false;
                    this.showImage = false;
                  }
                ).add(() => this.subscribePerson.unsubscribe());
            }
          }
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
