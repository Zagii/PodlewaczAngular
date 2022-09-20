import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSidenavModule
  ],
  exports: [
   // MatTabsModule,
    MatSidenavModule
  ]
})
export class MaterialModule { }


