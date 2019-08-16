import {Component, OnInit} from '@angular/core';
import {Observable, timer} from 'rxjs';
import {Router} from '@angular/router';

declare const faceapi: any;
export const URI = '../../assets/models';

@Component({
  selector: 'app-face-api',
  templateUrl: './face-api.component.html',
  styleUrls: ['./face-api.component.css']
})
export class FaceApiComponent implements OnInit {
  video: any;
  stepSelect: any = {};
  width = 300;
  steps = {
    INIT: {
      state: 'init',
      message: 'Espere unos segundos, por favor'
    },
    HAPPY: {
      state: 'happy',
      message: 'Mantenga una expresión sonrisa, por favor'
    },
    ANGRY: {
      state: 'angry',
      message: 'Mantenga una expresión de enojo, por favor'
    },
    FINISH: {
      state: 'finish',
      message: 'Muchas gracias'
    }
  };
  showDraw = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.stepSelect = this.steps.INIT;
    this.width = window.innerWidth;
    this.initVideo();
  }

  initVideo() {
    this.video = document.getElementById('video');
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(URI),
      faceapi.nets.faceLandmark68Net.loadFromUri(URI),
      faceapi.nets.faceRecognitionNet.loadFromUri(URI),
      faceapi.nets.faceExpressionNet.loadFromUri(URI)
    ]).then(dta => {
      this.startVideo();
    }).then(() => {
      this.video.addEventListener('play', () => {
        const canvas = faceapi.createCanvasFromMedia(this.video);
        canvas.style.position = 'absolute';
        document.getElementById('canv-content').append(canvas);
        const displaySize = {
          width: this.video.width,
          height: this.video.height
        };
        faceapi.matchDimensions(canvas, displaySize);
        setInterval(async () => {
          const detections = await faceapi
            .detectSingleFace(this.video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions();
          if (detections) {
            const resizedDetections = faceapi.resizeResults(
              detections,
              displaySize
            );
            canvas
              .getContext('2d')
              .clearRect(0, 0, canvas.width, canvas.height);
            if (this.showDraw) {
              faceapi.draw.drawDetections(canvas, resizedDetections);
              faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
              faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
            }
            if (this.stepSelect.state === this.steps.INIT.state) {
              this.stepSelect = this.steps.HAPPY;
            } else {
              this.moreExpresion(resizedDetections);
            }
          }
        }, 500);
      });
    }).catch(e => console.log('error=', e));
  }

  moreExpresion(resizedDetections) {
    let pass = false;
    switch (this.stepSelect.state) {
      case this.steps.HAPPY.state:
        pass = this.matchParameter(resizedDetections.expressions.happy);
        break;
      case this.steps.ANGRY.state:
        pass = this.matchParameter(resizedDetections.expressions.angry);
        break;
    }
    if (pass) {
      this.nextStep();
    }
  }

  matchParameter(param) {
    return 0.6 < param;
  }

  nextStep() {
    switch (this.stepSelect.state) {
      case this.steps.HAPPY.state:
        this.stepSelect = this.steps.ANGRY;
        break;
      case this.steps.ANGRY.state:
        this.stepSelect = this.steps.FINISH;
        timer(3000)
          .toPromise()
          .then(() => this.router.navigate(['/selfie']));
        break;
    }
  }

  startVideo() {
    navigator.getUserMedia(
      {video: {}},
      stream => (this.video.srcObject = stream),
      err => console.error(err)
    );
  }
}
