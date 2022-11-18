import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setup-meteo',
  templateUrl: './setup-meteo.component.html',
  styleUrls: ['./setup-meteo.component.scss']
})
export class SetupMeteoComponent implements OnInit {

  dataOstatniegoRequestu:any="15.11.2022";
  lat:number=12;
  long:number=45;
  ostatniaPrognozaPogody:any={};
  korektaOpadow=-1;
  korektaSuszy=2;
  minPrawdOpadow=60;
  progOpadow=1;
  krokKorektyOpadow=-1;
  minPoziomWilgotnosci=40;
  minTempSuszy=20;
  krokKorektySuszy=1;


  constructor() { }

  ngOnInit(): void {
  }

}
