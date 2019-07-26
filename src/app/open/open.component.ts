import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgOpenCVService, OpenCVLoadResult} from 'ng-open-cv';
import {filter, switchMap} from 'rxjs/operators';
import {fromEvent, Observable} from 'rxjs';

@Component({
  selector: 'app-open',
  templateUrl: './open.component.html',
  styleUrls: ['./open.component.css']
})
export class OpenComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
  }
  //
  // // Keep tracks of the ready
  // openCVLoadResult: Observable<OpenCVLoadResult>;
  //
  // // HTML Element references
  // @ViewChild('fileInput') fileInput: ElementRef;
  // @ViewChild('canvasOutput')  canvasOutput: ElementRef;
  //
  //
  // @ViewChild("video")
  // public video: ElementRef;
  //
  // @ViewChild("canvas")
  // public canvas: ElementRef;
  //
  // public captures: Array<any>;
  //
  constructor(private ngOpenCVService: NgOpenCVService) {
    // this.captures = [];
  }
  //
  ngOnInit() {
  //   this.openCVLoadResult = this.ngOpenCVService.isReady$;
  }

  //   if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  //     navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  //       this.video.nativeElement.src = window.URL.createObjectURL(stream);
  //       this.video.nativeElement.play();
  //     });
  //   }
  //
  // public capture() {
  //   var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
  //   this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
  // }
  //
  // loadImage(event) {
  //   if (event.target.files.length) {
  //     const reader = new FileReader();
  //     const load$ = fromEvent(reader, 'load');
  //     load$
  //       .pipe(
  //         switchMap(() => {
  //           return this.ngOpenCVService.loadImageToHTMLCanvas(`${reader.result}`, this.canvasOutput.nativeElement);
  //         })
  //       )
  //       .subscribe(
  //         () => {
  //         },
  //         err => {
  //           console.log('Error loading image', err);
  //         }
  //       );
  //     reader.readAsDataURL(event.target.files[0]);
  //   }
  // }
}
