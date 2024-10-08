import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DigitalClockComponent } from '../../projects/digital-clock/src/lib/digital-clock.component';

export const routes: Routes = [
  { path: 'digital-clock', component: DigitalClockComponent },
  { path: '', redirectTo: '/digital-clock', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }