import { Component, OnInit } from '@angular/core';
import { Program, Sekcja, Sekwencja } from 'src/assets/typyObiektow';
import { ApiService } from '../api.service';
import {faClock } from '@fortawesome/free-solid-svg-icons';
//import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-programy-maual',
  templateUrl: './programy-maual.component.html',
  styleUrls: ['./programy-maual.component.scss']
})



export class ProgramyMaualComponent implements OnInit {
 
  progUruchomiony:boolean=false;
  selectedProgram?:Program;
  programy:Program[]=[];
  categories = ['a','b'];


  sekwencje:Sekwencja[]=[];
  sekcje:Sekcja[]=[];
  
  odswWykres=false;
  data:any=[];
  predkoscProgramu:number=1;
  
  constructor(private apiService:ApiService) { }

  
dajNazweSekcji(s:Sekwencja):String
{
  
  const x = this.sekcje.find(i=>i.sekcjaId==s.sekcjaId)?.nazwa;
  if(x)
    return x;
  return 'brak';
}

  changeSelectProgram(p:any)
  {
    this.selectedProgram=p;
    this.aktualizujDane();
  }
  aktualizujDane()
{
  console.log("mojeData");
  let that=this;
  this.data=[];
 
  this.sekwencje.forEach( (s,index) =>
    {
      if(this.selectedProgram && s.programId==this.selectedProgram.programId)
      {
        const o:any=
        {
        //  name: that.dajNazweSekcji(s),
          tooltipTxt: that.dajNazweSekcji(s)+'<br> start w: '+ 
                        that.apiService.getTimeStrig(s.startAkcji)+'<br> czas trwania: '+
                        that.apiService.getTimeStrig(s.czasTrwaniaAkcji)+'<br> koniec w: '+
                        that.apiService.getTimeStrig((s.startAkcji+s.czasTrwaniaAkcji)),
          sekwencja:s,
                //  sekcjaId, start, koniec, dlugosc , nazwa sekcji, sekwencjaId
          value: [s.sekcjaId,
                  s.startAkcji,
                  (s.startAkcji+s.czasTrwaniaAkcji),
                  s.czasTrwaniaAkcji,
                  that.apiService.getTimeStrig(s.czasTrwaniaAkcji),
                  s.sekwencjaId],
          itemStyle: {normal:{color:'#7b9cef'}}
        }            
        that.data.push(o);
      }
    });


  console.log("mojeData ",this.data)
}

  ngOnInit(): void {
    this.apiService.getProgramSubject().subscribe(p => 
      {

        this.programy=p;
        this.selectedProgram=p[0];//JSON.parse(JSON.stringify(p[0]));      
    });
    this.apiService.getSekwencjeSubject().subscribe(p => 
      {
        this.data=[];
        this.sekwencje=p;    
        this.aktualizujDane();
       
    });
    this.apiService.getSekcjeSubject().subscribe(p => 
      {
        this.sekcje=p;    
        this.categories=this.sekcje.map(x=> x.nazwa);
        this.aktualizujDane();
    });
  }

  
  
  
  getCalkowityCzas():string
  {
    return this.apiService.getTimeStrig(this.selectedProgram?.calkowityCzasTrwaniaProgramu);
  }
  
  odswiezWykres()
  {
    this.odswWykres=!this.odswWykres;
  }
  formatujOsX(val:any):any
  {
    let h:number=Math.floor(val/3600);
  
          let ht:string=h<10?"0"+h:h+"";
          
          let m:number=Math.floor((val%3600)/60)
          let mt:string=m<10?"0"+m:""+m;
          let s:number=Math.floor((val%60));
          let st:string=s<10?"0"+s:""+s+"";
          let str= ht+":"+mt+":"+st;
          //console.log(h+", "+ht+", "+m+ ", "+mt+", "+s+", "+st+", "+str);
          return /*Math.max(0, val) */ str+ ' s.';
   
  }
  formatLabel(value: number) {
    
    return value+'x';
  }
  start()
  {
    if(this.selectedProgram)
    {
      const i=this.selectedProgram.programId ? this.selectedProgram.programId :-1;
      this.progUruchomiony=true;
    this.apiService.startProgram(i,this.predkoscProgramu)
  }}
  stop()
  {
    this.progUruchomiony=false;
  }
}
