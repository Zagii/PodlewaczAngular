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

  dniTyg=["Pon","Wt","Śr","Czw","Pt","Sob","Nd"];

  data:any=[];

  constructor(private apiService:ApiService,) { }

  ngOnInit(): void {
    this.apiService.getProgramSubject().subscribe(p => 
      {

        this.programy=p;
        this.selectedProgram=p[0];//JSON.parse(JSON.stringify(p[0]));
       
        
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
    console.log("onChartClick");
  }

  mojeData()
  {
  console.log("mojeData");
  let that=this;
  this.data=[];
 
  this.programy.forEach( (s,index) =>
    {
      if(this.selectedProgram && s.programId==this.selectedProgram.programId)
      {
        const o:any=
        {
//          name: that.dajNazweSekcji(s),
          sekwencja:s,
                //  sekcjaId, start, koniec, dlugosc , nazwa sekcji, sekwencjaId
          value: [s.programId,
                  s.godziny,
                  //(s.startAkcji+s.czasTrwaniaAkcji),
                  //s.czasTrwaniaAkcji,
  //                that.dajNazweSekcji(s),
                  //s.sekwencjaId
                ],
          //itemStyle: {normal:{color:'#7b9cef'}}
        }            
        that.data.push(o);
      }
    });


  console.log("mojeData ",this.data)
  }
}
