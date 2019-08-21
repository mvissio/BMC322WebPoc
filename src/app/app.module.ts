import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {WebcamModule} from 'ngx-webcam';
import {HomeComponent} from './pages/home/home.component';
import {SelfieComponent} from './pages/selfie/selfie.component';
import {DniComponent} from './pages/dni/dni.component';
import {ResultComponent} from './pages/result/result.component';
import {FaceApiComponent} from './pages/face-api/face-api.component';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {CommonsService} from './services/commons.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResultComponent,
    FaceApiComponent,
    DniComponent,
    SelfieComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    WebcamModule,
    AppRoutingModule
  ],
  providers: [CommonsService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
