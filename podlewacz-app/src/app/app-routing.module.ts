import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManualComponent } from './manual/manual.component';
import { UstawieniaComponent } from './ustawienia/ustawienia.component';
import { HarmonogramComponent } from './harmonogram/harmonogram.component';

const routes: Routes =[
    { path: 'home', component: HomeComponent},
    { path: 'manual', component: ManualComponent},
    { path: 'ustawienia', component: UstawieniaComponent},
    { path: 'harmonogram', component:HarmonogramComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
