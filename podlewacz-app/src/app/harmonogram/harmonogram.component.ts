import { Component, OnInit } from '@angular/core';
import { Program } from 'src/assets/typyObiektow';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-harmonogram',
  templateUrl: './harmonogram.component.html',
  styleUrls: ['./harmonogram.component.scss']
})
export class HarmonogramComponent implements OnInit {
  odswWykres=false;
  selectedProgram?:Program;
  programy:Program[]=[];

 

  data:any=[];

  constructor(private apiService:ApiService,) { }

 
  ngOnInit(): void {
    this.apiService.getProgramSubject().subscribe(p => 
      {

        this.programy=p;
        this.selectedProgram=p[0];//JSON.parse(JSON.stringify(p[0]));
       
        this.aktualizujData();
        
    });
  }
 /* wymuszenie odswiezenia wykresu poprzez przekazanie wartosci do zmiennej kora nic nie robi
  w ten sposob oszukuje angulara, brzydkie ale działa */
  odswiezWykres()
  {
    this.odswWykres=!this.odswWykres;
  }
  onChartClick(e:any)
  {
    //console.log("onChartClick",e);
    this.selectedProgram=this.programy.find(x=>x.programId=e.data.obiekt.programId);
    this.odswiezWykres();
  }
  getDniTyg():any[]
  {
    return this.apiService.dniTyg;
  }
  dajGodzineStr(gInt:number):string
  {
    if(gInt>2400)gInt=0;
    let g = (gInt/100<10)? "0"+(gInt/100)  : (gInt/100)+"" ;
    let m = (gInt%100<10)? "0"+(gInt%100)  : (gInt%100)+"" ;
    //+":"+gInt%100;
    return g+":"+m;
  }
  formatujOsX(val:any):any
  {
   if(val>2400)val=0;
   let g = (val/100<10)? "0"+(val/100)  : (val/100)+"" ;
    let m = (val%100<10)? "0"+(val%100)  : (val%100)+"" ;
   return  g+":"+m;
   
  }
  aktualizujData()
  {
  console.log("aktualizujData");
  let that=this;
  this.data=[];
 
  this.programy.forEach( (p:Program,index) =>
    {
     // if(this.selectedProgram && p.programId==this.selectedProgram.programId)
   //   {
        for(let d=0;d<p.dni.length;d++)
        {
          if(p.dni[d]=="1")
          {
            p.godziny.forEach(g =>
              {
               // let dlugosc=150; /// policzyc dlugosc <<<<<<<<<<<!!!!!!!!!!
                const o:any=
                {
                  tooltipTxt: p.nazwa+'<br> start o: '+ 
                              this.dajGodzineStr(g)+'<br> czas trwania: '+
                              this.apiService.getTimeStrig(p.calkowityCzasTrwaniaProgramu)+'<br> dzień uruchomienia: '+
                              this.apiService.dajNazweDnia(d),
                  obiekt:p,
                  dzien:this.apiService.dajPLIdDnia(d),
                  godzina:g,
                        //  sekcjaId, start, koniec, dlugosc , nazwa sekcji, sekwencjaId
                  value: [this.apiService.dajPLIdDnia(d),
                          g,
                          g+(!p.calkowityCzasTrwaniaProgramu?0:p.calkowityCzasTrwaniaProgramu),
                          p.calkowityCzasTrwaniaProgramu,
                          p.nazwa,
                          p.programId
                        ],
                  //itemStyle: {normal:{color:'#7b9cef'}}
                }            
                that.data.push(o);
              });
            }
          }
     // }
    });


  //console.log("aktualizujData ",this.data)
  }
}
