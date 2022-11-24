import {  AfterViewInit, Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Program, Sekcja,Stan, StanAll, StanSet } from 'src/assets/typyObiektow';
import { faShower,faClock } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.scss']
})
export class ManualComponent implements OnInit,AfterViewInit{
  faShower = faShower;faClock=faClock;
  sekcje: Sekcja[]=[];
  stanAll? : StanAll;
 // stany: Stan[]=[];
  programy: Program[]=[];
  czyNaCzas: boolean=false;
  czas:number=1;
  selectedProgram?:Program;
  wybranyTab:any;

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.apiService.getSekcjeSubject().subscribe(s => 
      {
        this.sekcje=s;
    });
    this.apiService.getStanSubject().subscribe(s => 
      {
        this.stanAll=s;
        //this.stany=s.sekcje;
        //console.log(s);
    });
    this.apiService.getProgramSubject().subscribe(s=>
      {
        this.programy=s;
      });
  }
  setBtnStyle(s:Sekcja):string
  {
    //[className]="s.typ==0 ? 'btn btn-circle btn-xl btn-success' : 'btn btn-circle btn-xl btn-secondary'" 
    let stan=this.stanAll?.sekcje.find(x=> x.sekcjaId== s.sekcjaId);
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
  pobierzDane(i:number)
  {
    switch(i)
    {
      case 0:
         this.apiService.getSekcje();
         this.apiService.getProgram();
        break;
      case 1:
        this.apiService.getSekcje();
         this.apiService.getProgram();
         this.apiService.getSekwencje();
        break;
     
      default:
        this.apiService.getSekcje();
        this.apiService.getProgram();
        this.apiService.getSekwencje();
        this.apiService.getSystem();
    }
    
  }
  tabSelectedTabChange(e:any)
  {
    this.wybranyTab=e;
    console.log("wybrany tab: ",e);
    this.pobierzDane(e.index);
   
  }
  ngAfterViewInit() {
    // viewChild is updated after the view has been checked
    console.log("manual view init");
    this.pobierzDane(-1);
    
  }
  changeCzas(i:number)
  {
    this.czas=this.czas+i;
    if(this.czas<1)this.czas=1;
  }
  dajCzasDoWylaczeniaSekcji(sId?:number):string
  {
    const x=this.stanAll?.sekcje.find(a=>a.sekcjaId==sId);
    if(x?.autoSwitchActive&& this.stanAll)
    {
      return this.apiService.getTimeStrig((x.lastStateChanged+x.timeToSwitch-this.stanAll?.upT)/1000);
    }else
    return "";
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
    
    let obecnyStan=this.stanAll?.sekcje.find(x=> x.sekcjaId== s.sekcjaId);


    let tmpStan=obecnyStan? !obecnyStan.stan : true;
    let stan:StanSet={
      sekcjaId:obecnyStan? obecnyStan.sekcjaId:-1,
      stan: tmpStan? 1:0 ,
      czas:this.czyNaCzas?this.czas:0,
      
    };
    this.apiService.setStan(stan);
  }
}
