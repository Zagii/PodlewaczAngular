import { Component, OnInit } from '@angular/core';
import { Stan, StanAll } from 'src/assets/typyObiektow';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  stany?:StanAll;

  gui={
    aktualnaData:11,
    ostatniProgram:{nazwa:"Program1",lastProgramRun:"23234"},
    ostatniaAkcja:{sekcjaId:12,nazwaSekcji:"sekcja1",lastChange:"342334"}
  }

  constructor(private apiService:ApiService) 
  {
      this.apiService.getStanSubject().subscribe(s=>
        {
          this.stany=s;
          this.gui.aktualnaData=(s.ntp-(this.apiService.system? this.apiService.system?.ntpOffset:0))*1000;
          let last=0;
          let lastInd=-1;
          s.sekcje.forEach((e,i) =>
            {
              if(e.lastStateChanged>last)
              {
                lastInd=i;
                last=e.lastStateChanged;
              }
            });
            if(lastInd>=0)
            {
              this.gui.ostatniaAkcja.sekcjaId= s.sekcje[lastInd].sekcjaId;
              const n=this.apiService.sekcje.find(x=>x.sekcjaId==s.sekcje[lastInd].sekcjaId)?.nazwa;
              if(n)this.gui.ostatniaAkcja.nazwaSekcji= n;
              

              this.gui.ostatniaAkcja.lastChange=this.apiService.getTimeStrig((s.upT-last)/1000);
              this.gui.ostatniProgram.lastProgramRun=s.ntp+"";
              this.gui.ostatniProgram.nazwa=last+"";
            }
        });
  }

  ngOnInit(): void {
  }
  formatujGodzine(sekundy:number):string
  {
  /*  let date = new Date(sekundy);
    return date.getDay() + 
        + date.getHours() + ":" 
        + ("00" + date.getMinutes()).slice(-2) + ":"
        + ("00" + date.getSeconds()).slice(-2); 
  
  */
    
          const d = new Date(sekundy);
          const dd = [d.getHours(), d.getMinutes(), d.getSeconds()].map((a)=>(a < 10 ? '0' + a : a));
          const r= dd.join(':');
       //   console.log(sekundy, " ",r)
          
          
       return this.apiService.dajNazweDnia(d.getDay())+" "+ r;
  
  
   }
  
}
