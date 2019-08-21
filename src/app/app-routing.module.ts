import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { DniComponent } from './pages/dni/dni.component';
import { ResultComponent } from './pages/result/result.component';
import { SelfieComponent } from './pages/selfie/selfie.component';
import { FaceApiComponent } from './pages/face-api/face-api.component';

const routes: Routes = [
  { path: '', redirectTo: 'dni', pathMatch: 'full' },
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
  },
  { path: '**', pathMatch: 'full', redirectTo: 'dni' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
