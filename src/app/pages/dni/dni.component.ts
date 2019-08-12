import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';

import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonsService } from 'src/app/services/commons.service';
import { IAwsResponse } from '../../inteface/model.inteface';
import { CONST_AWS } from '../../const/const';

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
  imageType: string = 'image/jpeg';
  public width: any;
  public heith: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private commonsService: CommonsService
  ) {}

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  public ngOnInit(): void {
    this.width = window.innerWidth;
    this.heith = window.innerHeight;
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
    this.commonsService
      .detectDocument(this.webcamImageF.imageAsDataUrl)
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
          if (this.legend1) {
            localStorage.clear();
            localStorage.setItem('imgDni', this.webcamImageF.imageAsDataUrl);
          } else {
            localStorage.setItem(
              'imgDniDorso',
              this.webcamImageF.imageAsDataUrl
            );
          }
          this.webcamImageFView = true;
          this.pictureTaken.emit(webcamImage);
        }
      });
  }

  public goToNext() {
    if (!this.legend1) {
      this.router.navigate(['faceapi']);
    }
    this.webcamImageFView = false;
    this.legend1 = false;
  }
}
