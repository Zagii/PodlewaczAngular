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
   
    this.h=this.getH(sekundy); 
    if(this.h<0)
      this.h=Math.ceil(this.h);
    else
      this.h=Math.floor(this.h);
    this.ht= Math.abs(this.h)<10 ? this.ht="0"+Math.abs(this.h) : Math.abs(this.h)+"";
    
    this.m=this.getM(sekundy);
    if(this.m<0)
      this.m=Math.ceil(this.m);
    else
      this.m=Math.floor(this.m);
    this.mt= Math.abs(this.m)<10 ? this.mt="0"+Math.abs(this.m) : Math.abs(this.m)+"";
 
    this.s=Math.floor(this.getS(sekundy));
      this.st= Math.abs(this.s)<10 ? this.st="0"+Math.abs(this.s) : Math.abs(this.s)+"";
   //   console.log(this.h,this.m,this.s,this.sekundy,sekundy);
  }

  addSek(ile:number)
  {
  //  console.log("przed isminus:"+this.isMinus+" ile: "+ile+ " mnonik: "+mnoznik+", gtS: "+this.getSekundy());
    let sekundy=this.getSekundy()+ ile;   
    if(sekundy<this.minSekund)sekundy=this.minSekund;
    if(sekundy>this.maxSekund)sekundy=this.maxSekund;
    this.isMinus=(sekundy<0)?true:false;
    //sekundy=Math.abs(sekundy);
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
