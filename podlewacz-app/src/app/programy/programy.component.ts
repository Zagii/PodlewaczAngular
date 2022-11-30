import { Component, OnInit } from '@angular/core';
import { Program } from 'src/assets/typyObiektow';
import { ApiService } from '../api.service';
import {faClock } from '@fortawesome/free-solid-svg-icons';
//import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-programy',
  templateUrl: './programy.component.html',
  styleUrls: ['./programy.component.scss']
})



export class ProgramyComponent implements OnInit {
  faClock=faClock;
  zmieniany:boolean=false;
  selectedProgram?:Program;
  programy:Program[]=[];
  dniTab=[{nazwa:"Poniedziałek",skrot:"Pn",nr:1},{nazwa:"Worek",skrot:"Wt",nr:2},
{nazwa:"Środa",skrot:"Śr",nr:3},{nazwa:"Czwartek",skrot:"Czw",nr:4},
{nazwa:"Piątek",skrot:"Pt",nr:5},{nazwa:"Sobota",skrot:"Sb",nr:6},
{nazwa:"Niedziela",skrot:"Nd",nr:0}];

  nowaGodzina:number=0;
  nowaMinuta:number=0;
  
  
  constructor(private apiService:ApiService) { }

  changeSelectProgram(p:any)
  {
    

    if(this.zmieniany)
    {
      // wykryto zmiane
      if(confirm("Wykryto niezapisane zmiany \nw ustawieniach programu "+this.selectedProgram?.nazwa+" czy chcesz je zapisać?")) {
        console.log("zapis post");
        this.wyslijZmiany();
      }else
      {
        //anuluj zmiany
        this.analujZmiany();
      }
    }
    this.selectedProgram=JSON.parse(JSON.stringify(p));
  

  }
  ngOnInit(): void {
    this.apiService.getProgramSubject().subscribe(p => 
      {

        this.programy=p;
        if(this.selectedProgram==undefined)
            this.selectedProgram=JSON.parse(JSON.stringify(p[0]));
        this.zmieniany=false;
        
    });
  }
  onChange(event:any)
  {
    this.zmieniany=true;
  }
  dodajProgram()
  {
    console.log("Dodaj program btn");
    if(this.zmieniany)
    {
      // wykryto zmiane
      if(confirm("Wykryto niezapisane zmiany \nw ustawieniach programu "+this.selectedProgram?.nazwa+" czy chcesz je zapisać?")) {
        console.log("zapis post");
        this.wyslijZmiany();
      }else
      {
        //anuluj zmiany
        this.analujZmiany();

      }
    }
    let nowyProgram: Program={
      nazwa:"NowyProgram",
      dni: "0000000",
      aktywny:false,
      godziny:[]
    };
 
 
    this.selectedProgram=nowyProgram;
    this.zmieniany=true;
  }
  analujZmiany()
  {
    this.apiService.getProgram();
    this.zmieniany=false;
  }
  usunProgram()
  {
   if(confirm("Czy napewno chcesz usunąć sekcję: "+this.selectedProgram?.nazwa)) 
   {
    if(this.selectedProgram)
      this.apiService.deleteProgram(this.selectedProgram);
    this.zmieniany=false;
   }else
   {
    console.log("anulowano usunProgram");
   }
  }
  wyslijZmiany()
  {
    if(this.selectedProgram)
      {
        this.apiService.sendProgram(this.selectedProgram);
        this.zmieniany=false;
      }
    else
     console.log(this.selectedProgram);
  }
  
  dniChange(event: any, dzien:any)
  {
    console.log("Zmieniono dni: "+dzien.nazwa,event.checked);
    if(this.selectedProgram)
    {
      console.log(this.selectedProgram.dni );
      
      let strArr = this.selectedProgram.dni.split("");
      strArr[dzien.nr] = event.checked ?"1":"0";
      console.log(strArr );
      this.selectedProgram.dni = strArr.join("");
      console.log(this.selectedProgram.dni );
    }
    this.zmieniany=true;
  }
  czyDniChecked(dzien:any):boolean
  {
    /*console.log(dzien);
    console.log(this.selectedProgram?.dni);
    console.log(this.selectedProgram?.dni.charAt(dzien.nr));*/
    if(this.selectedProgram && this.selectedProgram?.dni && this.selectedProgram.dni.length<=dzien.nr)
      return this.selectedProgram.dni.charAt(dzien.nr)=='1'?true:false;
    else
      return false;
  }
  formatujGodzine(g:number):string
  {
    let h,m;
    //{{p/100 >9 ? p/100: '0'+p/100}}:{{p%100>9? p%100: '0'+p%100}}
    let t=Math.floor(g/100);
    if(t<10)h='0'+t; else h=t;
    t=Math.floor(g%100);
    if(t<10)m='0'+t; else m=t;
    return h+':'+m;
  }
  getCalkowityCzas():string
  {
    return this.apiService.getTimeStrig(this.selectedProgram?.calkowityCzasTrwaniaProgramu);
  }
  dodajGodzine()
  {
    console.log("nowa godzina programu");
    let g=this.nowaGodzina*100+this.nowaMinuta;
    if(this.selectedProgram)
    {
      if(this.selectedProgram.godziny&&this.selectedProgram?.godziny.find((element) => {
        return element === g;}) !== undefined)
      {
          console.log("Nie dodaje nic, taka godina juz istnije");
          return;
      }
      if(!this.selectedProgram.godziny)
        this.selectedProgram.godziny=[];
      this.selectedProgram.godziny.push(g);
      this.selectedProgram.godziny = this.selectedProgram.godziny.sort((a,b)=> a - b);
      this.zmieniany=true;
    }
    
    
  }
  usunGodzine(g:number)
  {
    console.log("usuwam godzine programu: "+g);
    if(this.selectedProgram&&this.selectedProgram.godziny)
    {
      const index = this.selectedProgram?.godziny.findIndex(gg => gg === g); 
      this.selectedProgram?.godziny.splice(index,1);
      this.zmieniany=true;
    }
  }
}
