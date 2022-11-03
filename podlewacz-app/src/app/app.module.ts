import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; 
import { FormsModule } from '@angular/forms';

import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { ManualComponent } from './manual/manual.component';
import { DebugComponent } from './debug/debug.component';
import { BarComponent } from './bar/bar.component';
import { UstawieniaComponent } from './ustawienia/ustawienia.component';
import { HarmonogramComponent } from './harmonogram/harmonogram.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { SekcjeComponent } from './sekcje/sekcje.component';
import { ProgramyComponent } from './programy/programy.component';
import { SekwencjeComponent } from './sekwencje/sekwencje.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { DialogSekwencjeComponent } from './dialog-sekwencje/dialog-sekwencje.component';
import { KontrolkaCzasComponent } from './kontrolka-czas/kontrolka-czas.component';
import { KontrolkaWykresComponent } from './kontrolka-wykres/kontrolka-wykres.component';
//import * as echarts from 'echarts';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HomeComponent,
    LayoutComponent,
    HeaderComponent,
    SidenavListComponent,
    ManualComponent,
    DebugComponent,
    BarComponent,
    UstawieniaComponent,
    HarmonogramComponent,
    SekcjeComponent,
    ProgramyComponent,
    SekwencjeComponent,
    DialogSekwencjeComponent,
    KontrolkaCzasComponent,
    KontrolkaWykresComponent,
    
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
   // CollapseModule
    CollapseModule.forRoot(),
    FontAwesomeModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientInMemoryWebApiModule.forRoot(  InMemoryDataService, { dataEncapsulation: false }  ),
    Ng2GoogleChartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
