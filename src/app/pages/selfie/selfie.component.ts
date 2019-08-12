import {Component, EventEmitter, OnInit} from '@angular/core';
import {WebcamImage, WebcamInitError} from 'ngx-webcam';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
// import * as base64Img from 'base64-img';

@Component({
  selector: 'app-selfie',
  templateUrl: './selfie.component.html',
  styleUrls: ['./selfie.component.css']
})
export class SelfieComponent implements OnInit {
  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = false;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  webcamImageF;
  switched = false;
  legend1 = true;
  public pictureTaken = new EventEmitter<WebcamImage>();

  constructor(private router: Router, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  public handleInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === 'NotAllowedError') {
      console.warn('Camera access was not allowed by user!');
    }
  }

  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImageF = webcamImage;
    const result = webcamImage.imageAsDataUrl;
    // base64Img.base64('path/demo.png', (err, data)=> {
    //   console.log(data);
    // });

    // result = result.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
    this.pictureTaken.emit(webcamImage);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    this.nextWebcam.next(directionOrDeviceId);
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }


  public cameraWasSwitched(deviceId: string): void {
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
}
