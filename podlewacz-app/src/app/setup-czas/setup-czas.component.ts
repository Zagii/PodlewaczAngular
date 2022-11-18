import { Component, OnInit } from '@angular/core';
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

  dniTyg;
  czasManual=0;

  constructor(private apiService:ApiService) { 
    this.dniTyg=this.apiService.dniTyg;
  }

  ngOnInit(): void {
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
