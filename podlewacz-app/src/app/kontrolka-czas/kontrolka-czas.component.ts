import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-kontrolka-czas',
  templateUrl: './kontrolka-czas.component.html',
  styleUrls: ['./kontrolka-czas.component.scss']
})
export class KontrolkaCzasComponent implements OnInit, OnChanges {

  @Input() tytul:string="czas";
  @Input() minSekund:number=-Infinity;
  @Input() maxSekund:number=Infinity;
  @Input() btnSzt:number=3;
  @Input() sekundy: number=0;
  @Output() sekundyChange: EventEmitter<number> = new EventEmitter<number>();
  
  krokiTab=[1,5,10,20];

  changeSekundy(s:number) {
    this.sekundy=s;
    this.setLiczby(s);
   // console.log("changeSekundy "+s);
    this.sekundyChange.emit(this.sekundy);
  }
  
  wielkosc:number=1;
  isMinus:boolean=false;
  h:number=0;
  m:number=0;
  s:number=0;
  ht:string="00";
  mt:string="00";
  st:string="00";
  constructor() { }

  ngOnInit(): void {
    this.setLiczby(this.sekundy);
  }
  ngOnChanges():void
  {
    this.setLiczby(this.sekundy);
  }
  getSekundy():number
  {
    return 3600*this.h+60*this.m+this.s;//*(this.isMinus?-1:1);
  }
  getH(sekundy:number):number { return sekundy/3600;}
  getM(sekundy:number):number { return (sekundy%3600)/60;}
  getS(sekundy:number):number {return (sekundy%60);}
  
  setLiczby(sekundy:number)
  {
   
    if(this.isMinus)
    {
      //sekundy*=-1;
    }
    this.h=Math.floor(this.getH(sekundy)); 
      this.ht= this.h<10 ? this.ht="0"+this.h : this.h+"";
    this.m=Math.floor(this.getM(sekundy));
      this.mt= this.m<10 ? this.mt="0"+this.m : this.m+"";
    this.s=Math.floor(this.getS(sekundy));
      this.st= this.s<10 ? this.st="0"+this.s : this.s+"";
  }

  addSek(ile:number)
  {

    let mnoznik=this.isMinus?-1:1;
  //  console.log("przed isminus:"+this.isMinus+" ile: "+ile+ " mnonik: "+mnoznik+", gtS: "+this.getSekundy());
    let sekundy=mnoznik*this.getSekundy()+ ile;   
    if(sekundy<this.minSekund)sekundy=this.minSekund;
    if(sekundy>this.maxSekund)sekundy=this.maxSekund;
    this.isMinus=(sekundy<0)?true:false;
    sekundy=Math.abs(sekundy);
   // console.log("po isminus:"+this.isMinus+" sek: "+sekundy+ " mnonik: "+mnoznik);

    this.changeSekundy(sekundy);
  }
  addMin(ile:number)
  {
    this.addSek(ile*60);
  }
  addGodz(ile:number)
  {
    this.addSek(ile*3600);
  }
  

}
