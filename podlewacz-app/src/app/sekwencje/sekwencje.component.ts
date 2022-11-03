import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleChartInterface, GoogleChartType } from 'ng2-google-charts';
import { DialogData, Program, Sekcja, Sekwencja } from 'src/assets/typyObiektow';
import { ApiService } from '../api.service';

import { EChartsOption, ECharts, CustomSeriesRenderItemReturn, graphic, color } from 'echarts';
import { OverlayOutsideClickDispatcher } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
import { DialogSekwencjeComponent } from '../dialog-sekwencje/dialog-sekwencje.component';
import {  ChangeDetectorRef } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { reduce } from 'rxjs';


//import * as echarts from 'echarts/types/dist/echarts';

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
    akcja:true,
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
  this.categories=this.sekcje.map(x=> x.nazwa);
  console.log("random");
  console.log(o);
}
mojeData()
{
  console.log("mojeData");
  let that=this;
 
 
  this.sekwencje.forEach( (s,index) =>
    {
      if(this.selectedProgram && s.programId==this.selectedProgram.programId)
      {
        const o:any=
        {
          name: that.dajNazweSekcji(s),
          sekwencja:s,
                //  sekcjaId, start, koniec, dlugosc , nazwa sekcji, sekwencjaId
          value: [s.sekcjaId,s.startAkcji,(s.startAkcji+=s.czasTrwaniaAkcji),s.czasTrwaniaAkcji,that.dajNazweSekcji(s),s.sekwencjaId],
          itemStyle: {normal:{color:'#7b9cef'}}
        }            
        that.data.push(o);
      }
    });


  console.log(this.data)
}

constructor(private apiService:ApiService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
    ) {
 this.mojeData();
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
        //this.chart.columnNames  
      this.mojeData();
      //this.makeData();
      this.aktualizujDane();
       
    });
    this.apiService.getSekcjeSubject().subscribe(p => 
      {
        this.sekcje=p;    
        this.categories=this.sekcje.map(x=> x.nazwa);
       // nazwy=nazwy.reverse();
      /*  this.echartsIntance?.setOption(
        {
              yAxis:
              {
                data:nazwy,
              }
        });*/
        this.aktualizujDane();
       // console.log(nazwy);
    });
   // console.log(this.chartOption);
  }
 
  aktualizujDane()
  {
    console.log("aktualizuje dane");
   // console.log("liczba sekwencji: "+this.sekwencje.length);
   // console.log("liczba data: "+this.data.length);
  

  }
  dodajSekwencje()
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
    /*let nowaSekwencja: Sekwencja={
      programId:this.selectedProgram?.programId;
           
    };*/
 
    this.zmieniane=true;
  }
  analujZmiany()
  {
    this.apiService.getSekwencje();
    this.zmieniane=false;
  }
  usunSekwencje()
  {
   if(confirm("Czy napewno chcesz usunąć krok z programu: "+this.selectedProgram?.nazwa)) 
   {
    /*if(this.selectedProgram)
      this.apiService.deleteProgram(this.selectedProgram);
    */
    this.zmieniane=false;
   }else
   {
    console.log("anulowano usunSekwencje");
   }
  }
  wyslijZmiany()
  {
    if(this.selectedSekwencja)
      {
        //this.apiService.sendProgram(this.selectedProgram);
        this.zmieniane=false;
      }
    else
     console.log(this.selectedProgram);
  }
  sekwencjaClick(klikSekwencja:Sekwencja)
  {
    if(this.zmieniane)
    {
      //zmieniono na inna sekwencje bez zapisywania
      if(this.selectedSekwencja?.sekwencjaId!=klikSekwencja.sekwencjaId)
      {
        if(confirm("Nie zapiano zmian w modfikowanym kroku, czy chcesz to zrobić teraz?")) {
          console.log("zapis post");
          //TODO usun sekwencje
          this.zmieniane=false;
        }else
        {
          console.log("anuluj klik diagram");
          //anuluj zmiany
          this.analujZmiany();
        }
      }
    }

    this.selectedSekwencja=klikSekwencja;
    console.log("timeout klik:"+  this.selectedSekwencja?.sekwencjaId);
   console.log(this);
   
   this.aktualizujDane();
   this.odswiez();
   //this.cdr.detectChanges();
  }
  getTimeStrig(sekundy?:number):string
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
 
  odswiez()
  {
    console.log("odswiez");
    console.log(this);
    this.cdr.detectChanges();
  }
  openDialog(sekwencja?:Sekwencja): void {
    let sek;
  //  console.log(this.selectedSekwencja);
   /// if(!this.selectedProgram)return;
    if(!this.selectedSekwencja)
    {
      // todo tworzenie nowej sekwecji, tymczasowo 0
      if(this.selectedProgram?.programId)
      {
        
        sek={
          sekwencjaId:-1,
          programId:this.selectedProgram?.programId,
          sekcjaId:0,
          startAkcji:0,
          czasTrwaniaAkcji:10,
          akcja:true,

        };
      }
    }else
    {
      sek=JSON.parse(JSON.stringify(this.selectedSekwencja));
    }
  //  let sekwencja=this.sekwencje.find(x=>x.sekwencjaId==sekwencjaId);
    let data:DialogData={data:sek,result:{parent:this}};
    console.log(data);
    
    const dialogRef = this.dialog.open(DialogSekwencjeComponent, {
      width: '550px',
      data: data,
    });
   
    dialogRef.afterClosed().subscribe(r => {
      console.log('The dialog was closed '+r.ret);
      let rrr=r.result.ret;
      console.log(r);
      if(rrr=="OK")
      {
        console.log("fake dodaje")
        this.sekwencje.push(r.data);
        this.mojeData();
        this.aktualizujDane();
      }else console.log("ret: "+r.ret)
    });
   
  }

  anulujZmiany()
  {
    this.selectedSekwencja=undefined;
    this.cdr.detectChanges();
  }
  deleteSekwencja()
  {
    if(this.selectedSekwencja && this.selectedProgram)
    {
      
       // wykryto zmiane
       if(confirm("Czy napewno chcesz usunąć wybrany krok z programu "+this.selectedProgram.nazwa+"?")) {
        console.log("zapis post");
        //TODO usun sekwencje
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
    this.openDialog(this.selectedSekwencja);
  }

}


