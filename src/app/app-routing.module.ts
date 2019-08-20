import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DniComponent } from './pages/dni/dni.component';
import { ResultComponent } from './pages/result/result.component';
import { SelfieComponent } from './pages/selfie/selfie.component';
import { FaceApiComponent } from './pages/face-api/face-api.component';

const routes: Routes = [
  { path: '', redirectTo: 'dni', pathMatch: 'full' },
  { path: '**', pathMatch: 'full', redirectTo: 'dni' },
  {
    path: 'dni',
    component: DniComponent
  },
  {
    path: 'result',
    component: ResultComponent
  },
  {
    path: 'selfie',
    component: SelfieComponent
  },
  {
    path: 'faceapi',
    component: FaceApiComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
