import {  AfterViewInit, Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Program, Sekcja,Stan } from 'src/assets/typyObiektow';
import { faShower,faClock } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.scss']
})
export class ManualComponent implements OnInit,AfterViewInit{
  faShower = faShower;faClock=faClock;
  sekcje: Sekcja[]=[];
  stany: Stan[]=[];
  programy: Program[]=[];
  czyNaCzas: boolean=false;
  czas:number=1;
  selectedProgram?:Program;

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.apiService.getSekcjeSubject().subscribe(s => 
      {
        this.sekcje=s;
    });
    this.apiService.getStanSubject().subscribe(s => 
      {
        this.stany=s;
    });
    this.apiService.getProgramSubject().subscribe(s=>
      {
        this.programy=s;
      });
  }
  setBtnStyle(s:Sekcja):string
  {
    //[className]="s.typ==0 ? 'btn btn-circle btn-xl btn-success' : 'btn btn-circle btn-xl btn-secondary'" 
    let stan=this.stany.find(x=> x.sekcjaId== s.sekcjaId);
    if(stan)
    {
      if(stan.stan)
      {
        return 'btn btn-circle btn-xl btn-success';
      }else
      {
        return 'btn btn-circle btn-xl btn-secondary';
      }

    }
    return 'btn btn-circle btn-xl btn-warning';
  }
  ngAfterViewInit() {
    // viewChild is updated after the view has been checked
    console.log("manual view init");
    this.apiService.getSekcje();
    this.apiService.getStan();
    this.apiService.getProgram();
  }
  changeCzas(i:number)
  {
    this.czas=this.czas+i;
    if(this.czas<1)this.czas=1;
  }
  czasToStr()
  {
    return this.apiService.getTimeStrig(this.czas);
   /* let h,m,s;
    let t=Math.floor(this.czas/3600);
    if(t<10)h='0'+t;
    else h=t;

    t=Math.floor((this.czas%3600)/60);
    if(t<10)m='0'+t;
    else m=t;
 
    t= Math.floor(this.czas%60);
    if(t<10)s='0'+t;
    else s=t;

    return h+"h "+m+"min "+s+"sek"*/
  }
  klik(s:Sekcja)
  {
    console.log("Klik sekcja "+s.nazwa+": "+s.sekcjaId);
    
    let obecnyStan=this.stany.find(x=> x.sekcjaId== s.sekcjaId);


    
    let stan={
      sekcjaId:obecnyStan? obecnyStan.sekcjaId:-1,
      stan: obecnyStan? !obecnyStan.stan : true,
      autoSwitchActive:this.czyNaCzas?this.czas:0,
      lastStateChanged:0
    };
    this.apiService.setStan(stan);
  }
}
