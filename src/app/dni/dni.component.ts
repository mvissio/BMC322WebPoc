import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  public allowCameraSwitch = false;
  public multipleWebcamsAvailable = false;
  public deviceId: string;

  webcamImageF;
  switched = false;
  legend1 = true;
  constructor(private router: Router, private http: HttpClient) {}
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      }
    );
  }

  public triggerSnapshot(): void {
    this.trigger.next();
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
  }
  getBinary(base64Image) {
    const binaryImg = atob(base64Image);
    const length = binaryImg.length;
    const ab = new ArrayBuffer(length);
    const ua = new Uint8Array(ab);
    for (let i = 0; i < length; i++) {
      ua[i] = binaryImg.charCodeAt(i);
    }

    return ab;
  }
  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImageF = webcamImage;
    const result = webcamImage.imageAsDataUrl;

    const base64Image = result.replace(
      /^data:image\/(png|jpeg|jpg);base64,/,
      ''
    );
    const imageBytes = this.getBinary(base64Image);
    console.log(imageBytes);
    const BODY2 = {
      files: { img: { data: imageBytes } }
    };
    console.log('body:', BODY2);

    const resultadoFace = this.http
      .post(
        `https://desolate-fortress-69862.herokuapp.com/detectDocument`,
        BODY2
      )
      .subscribe(val => console.log('leyendo doc=', resultadoFace));
    // });
    /* fetch(result)
      .then(res => res.blob())
      .then(blob => {
        const outside = URL.createObjectURL(blob);
        console.log(outside);

        const BODY2 = {
          files: { img: { data: blob } }
        };
        console.log('body:', BODY2);*/

    /*const resultadoFace = this.http
          .post(
            `https://desolate-fortress-69862.herokuapp.com/detectDocument`,
            BODY2
          )
          .subscribe(val => console.log('leyendo doc=', resultadoFace));*/
    // });

    // result = result.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
    // console.log(this.capturedImg);

    localStorage.clear();
    if (this.legend1) {
      localStorage.setItem('imgDni', result);
    } else {
      localStorage.setItem('imgDniDorso', result);
    }
    this.pictureTaken.emit(webcamImage);
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
    if (!this.switched) {
      this.switched = true;
      this.showNextWebcam(false);
    }
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
  public goToNext() {
    if (!this.legend1) {
      this.router.navigate(['home']);
    }
    this.legend1 = false;
  }
}
