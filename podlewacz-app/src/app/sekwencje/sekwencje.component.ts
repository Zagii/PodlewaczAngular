import { Component, OnInit} from '@angular/core';
import { DialogData, Program, Sekcja, Sekwencja } from 'src/assets/typyObiektow';
import { ApiService } from '../api.service';


import { MatDialog } from '@angular/material/dialog';
import { DialogSekwencjeComponent } from '../dialog-sekwencje/dialog-sekwencje.component';
import {  ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-sekwencje',
  templateUrl: './sekwencje.component.html',
  styleUrls: ['./sekwencje.component.scss']
})
export class SekwencjeComponent implements OnInit {
  //@ViewChild(echarts);
  public data:any = [];
  testNum=10;
  
  dataCount = 3;
  startTime = 50;
  categories = ['categoryA', 'categoryB', 'categoryC'];
  types = [
    { name: 'JS Heap', color: '#7b9ce1' },
    { name: 'Documents', color: '#bd6d6c' },
    { name: 'Nodes', color: '#75d874' },
    { name: 'Listeners', color: '#e0bc78' },
    { name: 'GPU Memory', color: '#dc77dc' },
    { name: 'GPU', color: '#72b362' }
  ];

  emphasisStyle = {
    itemStyle: {
      shadowBlur: 10,
      shadowColor: 'rgba(1,0,0,0.3)',
      color: '#75d874'
    }
  };

  selectedSekwencja?:Sekwencja;
  selectedProgram?:Program;
  programy:Program[]=[];
  sekwencje:Sekwencja[]=[];
  sekcje:Sekcja[]=[];
  zmieniane:boolean=false;
  odswWykres=false;
  
    

dajNazweSekcji(s:Sekwencja):String
{
  
  const x = this.sekcje.find(i=>i.sekcjaId==s.sekcjaId)?.nazwa;
  if(x)
    return x;
  return 'brak';
}
getRandomInt(min:number, max:number):number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
losuj()
{
  
  let a=this.getRandomInt(0,500), b=this.getRandomInt(0,300);
  let  s:Sekwencja={
    programId:1,
    sekwencjaId: this.getRandomInt(0,1000),
    startAkcji:a,
    czasTrwaniaAkcji:b,
    akcja:1,
    sekcjaId:this.getRandomInt(0,7),

  }
  const o:any=
  {
    name: "losuj",
    sekwencja:s,
          //  sekcjaId, start, koniec, dlugosc , nazwa sekcji, sekwencjaId
    value: [s.sekcjaId,s.startAkcji,(s.startAkcji+=s.czasTrwaniaAkcji),s.czasTrwaniaAkcji,this.dajNazweSekcji(s),s.sekwencjaId],
    itemStyle: {normal:{color:'#7b9cef'}}
  }            
  this.data.push(o);
 // this.categories=this.sekcje.map(x=> x.nazwa);
 this.odswiezWykres();
  console.log("random");
  console.log(o);
}

mojeData()
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

constructor(private apiService:ApiService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
    ) {
    
      this.aktualizujDane();
  }
  ngOnInit(): void {
    this.apiService.getProgramSubject().subscribe(p => 
      {

        this.programy=p;
      
      if(this.selectedProgram==undefined)  
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
 
  aktualizujDane()
  {
    console.log("aktualizuje dane");
    this.mojeData();
   // console.log("liczba sekwencji: "+this.sekwencje.length);
   // console.log("liczba data: "+this.data.length);
  

  }
  /*dodajSekwencje()
  {
    console.log("Dodaj program btn");
    if(this.zmieniane)
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
 
    this.zmieniane=true;
  }*/
  
  usunSekwencje(sekwencjaId:number)
  {
   if(confirm("Czy napewno chcesz usunąć krok z programu: "+this.selectedProgram?.nazwa)) 
   {
    /*if(this.selectedProgram)
      this.apiService.deleteProgram(this.selectedProgram);
    */
    this.apiService.deleteSekwencja(sekwencjaId);
    this.zmieniane=false;
   }else
   {
    console.log("anulowano usunSekwencje");
   }
  }
  dodajZmienSekwencje(s:Sekwencja)
  {
    this.apiService.sendSekwencja(s);
  }
  tmpZmien()
  {
    this.sekwencje.forEach(el => {
      el.akcja=1;
      this.dodajZmienSekwencje(el);
      
    });
  }
  
  getTimeString(sekundy?:number):string
  {
    if(!sekundy) return "";
    let h:number=Math.floor(sekundy/3600);

    let ht:string=h<10?"0"+h:h+"";
    
    let m:number=Math.floor((sekundy%3600)/60)
    let mt:string=m<10?"0"+m:""+m;
    let s:number=Math.floor((sekundy%60));
    let st:string=s<10?"0"+s:""+s+"";
    let str= ht+":"+mt+":"+st;
    if(h==0)
      str= mt+"min "+st+"sek";
    if(h==0&&m==0)
      str= st+"sek";
    return str;
  }

  openDialog(czyNowa?:boolean): void {

    if(!czyNowa)czyNowa=false;
    let sek;
    
    console.log("openDialog czyNowa: "+czyNowa, ", selectedSekwencja ", this.selectedSekwencja);
 
    if(czyNowa)
    {
      // todo tworzenie nowej sekwecji, tymczasowo 0
      if(this.selectedProgram)
      {
        console.log("nie wybrano sekwencji wiec tworze nowa");
        sek={
          sekwencjaId:-1,
          programId:this.selectedProgram?.programId,
          sekcjaId:0,
          startAkcji:0,
          czasTrwaniaAkcji:10,
          akcja:true,

        };
      }else console.log("nie wybrano programu ERR");
    }else
    {
      console.log("klonuje sekwencje do dialogbox");
      sek=JSON.parse(JSON.stringify(this.selectedSekwencja));

    }
  //  let sekwencja=this.sekwencje.find(x=>x.sekwencjaId==sekwencjaId);
    let data:DialogData={
      data:{
        sekwencja:sek,
        sekcje:this.sekcje,
        programName:this.selectedProgram?.nazwa
      }
      ,result:{parent:this}};
    console.log(data);
    
    const dialogRef = this.dialog.open(DialogSekwencjeComponent, {
      width: '550px',
      data: data,
    });
   
    dialogRef.afterClosed().subscribe(r => {
      console.log('The dialog was closed '+r.result.ret);
     // let rrr=r.result.ret;
   //   console.log(r);
      switch(r.result.ret)
      {
       case "OK":
          if(this.validateSekwencja(r.data.sekwencja))
          {
            console.log("walidacja OK");
          }else
          {
            alert("Modyfikowany krok koliduje z wcześniejszymi krokami. Krok nie zostanie zapisany");
            console.log("walidacja nie OK");
            return;
          }
          if(r.data.sekwencja.sekwencjaId==-1)
          {
            console.log("dialog OK dodaje")
            
          }else
          {
            console.log("dialog OK edytuje");
          }
          this.dodajZmienSekwencje(r.data.sekwencja);
            
        
          this.aktualizujDane();
          this.odswiezWykres();
          break;
        case "Cancel":
          console.log("SWITCH cancel");
          break;
        case "Delete":
          console.log("SWITCH delete");
          this.analujZmiany();
          break;
        default:
          console.log("SWITCH def");
          break;

      }
      console.log("ret: "+r.result.ret)
    });
   
  }
 
  analujZmiany()
  {
    console.log("anulujZminay");
    this.selectedSekwencja=undefined;
    this.apiService.getSekwencje();
    this.zmieniane=false;
  }
  
  deleteSekwencja()
  {
    if(this.selectedSekwencja && this.selectedProgram)
    {
      
       // wykryto zmiane
       if(confirm("Czy napewno chcesz usunąć wybrany krok z programu "+this.selectedProgram.nazwa+"?")) {
        console.log("zapis post");
        this.usunSekwencje(this.selectedSekwencja.sekwencjaId);
      }else
      {
        console.log("anuluj usun");
        //anuluj zmiany
        this.analujZmiany();
      }
    }
  }

 
  onChartClick(event:any): void {
    console.log('clicked value: ', event.data.sekwencja);
    this.selectedSekwencja=event.data.sekwencja;
    //this.selectedSekwencja=this.sekwencje.find((x:Sekwencja)=>x.sekwencjaId==event.data.sekwencja.sekwencjaId);
 //   this.openDialog(false);
  }

  /* wymuszenie odswiezenia wykresu poprzez przekazanie wartosci do zmiennej kora nic nie robi
  w ten sposob oszukuje angulara, brzydkie ale działa */
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
  selectProgramChange(e:any)
  {
    console.log("selectProgramChange ",e);
    this.selectedProgram=this.programy.find(x=>x.programId==e);
    this.aktualizujDane();
  }

  validateSekwencja(s:Sekwencja) :boolean
  {
    let ret=true;
    let tab=this.sekwencje.filter(x=>(x.programId==s.programId && x.sekcjaId==s.sekcjaId && x.sekwencjaId!=s.sekwencjaId));
    tab.push(s);
    tab = tab.sort((a,b)=> a.startAkcji - b.startAkcji);
    console.log(tab);
    for(let i=0;i<tab.length-1;i++)
    {
      if(tab[i].startAkcji+tab[i].czasTrwaniaAkcji>=tab[i+1].startAkcji)
      {
        console.log("nacodząca sekwencja: "+tab[i].sekwencjaId+" na sekwencje: "+tab[i+1].sekwencjaId);
        ret=false;
      }
    }
    return ret;
  }
}


