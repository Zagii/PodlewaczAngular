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
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
