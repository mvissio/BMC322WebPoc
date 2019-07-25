import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ResultComponent } from './result/result.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OpenComponent } from './open/open.component';
import { WebcamModule } from 'ngx-webcam';

import { NgOpenCVModule } from 'ng-open-cv';
import { DniComponent } from './dni/dni.component';

// import { AppRoutingModule } from './app-routing.module';
// import { OpenCVOptions } from 'projects/ng-open-cv/src/public_api';
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'result', component: ResultComponent },
  { path: 'dni', component: DniComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];
/*const openCVConfig: OpenCVOptions = {
  scriptUrl: `assets/opencv/opencv.js`,
  wasmBinaryFile: 'wasm/opencv_js.wasm',
  usingWasm: true
};*/
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResultComponent,
    OpenComponent,
    DniComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    WebcamModule
    /*NgOpenCVModule.forRoot(openCVConfig),
    AppRoutingModule*/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
