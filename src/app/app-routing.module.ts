import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DniComponent } from './pages/dni/dni.component';
import { ResultComponent } from './pages/result/result.component';

const routes: Routes = [
  { path: '', redirectTo: 'dni', pathMatch: 'full' },
  /* { path: '**', pathMatch: 'full', redirectTo: 'result' },*/
  {
    path: 'dni',
    component: DniComponent
  },
  {
    path: 'result',
    component: ResultComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
