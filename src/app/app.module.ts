import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OpenComponent } from './pages/open/open.component';
import { SelfieComponent } from './pages/selfie/selfie.component';
import { DniComponent } from './pages/dni/dni.component';
import { ResultComponent } from './pages/result/result.component';
import { FaceApiComponent } from './pages/face-api/face-api.component';
import { OpenCVOptions, NgOpenCVModule } from 'ng-open-cv';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WebcamModule } from 'ngx-webcam';
import { AppRoutingModule } from './app-routing.module';
import { CommonsService } from './services/commons.service';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'open', component: OpenComponent },
  { path: 'selfie', component: SelfieComponent },
  { path: 'dni', component: DniComponent },
  { path: 'result', component: ResultComponent },
  { path: 'faceapi', component: FaceApiComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];
const openCVConfig: OpenCVOptions = {
  scriptUrl: `assets/opencv/opencv.js`,
  wasmBinaryFile: 'wasm/opencv_js.wasm',
  usingWasm: true
};
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResultComponent,
    OpenComponent,
    FaceApiComponent,
    DniComponent,
    SelfieComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgOpenCVModule.forRoot(openCVConfig),
    FormsModule,
    WebcamModule,
    AppRoutingModule
  ],
  providers: [CommonsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
