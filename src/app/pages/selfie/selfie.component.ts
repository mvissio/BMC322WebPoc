import {Component, EventEmitter, OnInit} from '@angular/core';
import {WebcamImage, WebcamInitError} from 'ngx-webcam';
import {Observable, Subject, timer} from 'rxjs';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {CommonsService} from 'src/app/services/commons.service';

// import * as base64Img from 'base64-img';

@Component({
  selector: 'app-selfie',
  templateUrl: './selfie.component.html',
  styleUrls: ['./selfie.component.css']
})
export class SelfieComponent implements OnInit {
  public showWebcam = true;
  public deviceId: string;
  public errors: WebcamInitError[] = [];
  webcamImageF;
  webcamImageFView = false;
  switched = false;
  legend1 = true;
  imageType = 'image/jpeg';
  public width: any;
  public heith: any;
  results = '';
  reader;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private commonsService: CommonsService
  ) {
  }

  private trigger: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.width = window.innerWidth;
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

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImageF = webcamImage;
    localStorage.setItem('Selfie', this.webcamImageF.imageAsDataUrl);
    this.validarRenaper();
  }

  validarRenaper() {
    const selfie = localStorage.getItem('Selfie');
    const dni = localStorage.getItem('number');
    const gender = localStorage.getItem('gender');
    if (dni && selfie && gender) {
      this.commonsService.getRenaperFace(dni, gender, selfie).subscribe(res => {
        localStorage.setItem('resultFace', JSON.stringify(res));
        setTimeout(() => this.router.navigate(['result']), 3000);
      });
      this.router.navigate(['result']);
    } else {
      this.router.navigate(['result']);
    }
  }
}
