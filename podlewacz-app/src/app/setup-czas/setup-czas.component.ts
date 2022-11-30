import { Component, OnInit } from '@angular/core';
import { StanAll, System } from 'src/assets/typyObiektow';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-setup-czas',
  templateUrl: './setup-czas.component.html',
  styleUrls: ['./setup-czas.component.scss']
})
export class SetupCzasComponent implements OnInit {

  czyAktywnyNTP:boolean=true;
  zmieniono:boolean=false;
  offset=0;
  dzienTyg=0;
  data!:Date;
  dniTyg;
  czasManual=0;
  system!:System;
  stanAll!:StanAll;

  constructor(private apiService:ApiService) { 
    this.dniTyg=this.apiService.dniTyg;
  }

  ngOnInit(): void {
    this.apiService.getSystemSubject().subscribe(s => {
      this.system=s;
      this.offset=s.ntpOffset;
     
    });
    this.apiService.getStanSubject().subscribe(s => 
      {
        this.stanAll=s;
        let dt=(s.ntp-(this.system? this.apiService.system!.ntpOffset:0))*1000;
        this.data = new Date(dt);
        this.dzienTyg=this.data.getDay();
      //  const dd = [d.getHours(), d.getMinutes(), d.getSeconds()].map((a)=>(a < 10 ? '0' + a : a));
       // const r= dd.join(':');
    });
  }
getOffsetStr():string
{
  return "UTC"+ (this.offset>=0?"+":"")+Math.floor(this.offset/3600);
}
  onChange(e:any)
  {

  }
  wyslijZmiany()
  {

  }
  analujZmiany()
  {

  }
  getCzas():string
  {
    return this.apiService.getTimeStrig(this.czasManual);
  }
}
