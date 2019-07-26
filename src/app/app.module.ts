import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ResultComponent} from './result/result.component';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {OpenComponent} from './open/open.component';

import {NgOpenCVModule, OpenCVOptions} from 'ng-open-cv';

// import { AppRoutingModule } from './app-routing.module';
import {FaceApiComponent} from './face-api/face-api.component';
import {FormsModule} from '@angular/forms';

const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'open', component: OpenComponent},
  {path: 'result', component: ResultComponent},
  {path: 'faceapi', component: FaceApiComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: HomeComponent}
];
const openCVConfig: OpenCVOptions = {
  scriptUrl: `assets/opencv/opencv.js`,
  wasmBinaryFile: 'wasm/opencv_js.wasm',
  usingWasm: true
};

@NgModule({
  declarations: [AppComponent, HomeComponent, ResultComponent, OpenComponent, FaceApiComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgOpenCVModule.forRoot(openCVConfig),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
