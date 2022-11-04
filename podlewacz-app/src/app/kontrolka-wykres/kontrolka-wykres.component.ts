import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CustomSeriesRenderItemReturn, EChartsOption, graphic } from 'echarts';

@Component({
  selector: 'app-kontrolka-wykres',
  templateUrl: './kontrolka-wykres.component.html',
  styleUrls: ['./kontrolka-wykres.component.scss'],
 // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KontrolkaWykresComponent implements OnInit, OnChanges {
  @Input() 
    dane:any=[];
  @Input() 
  nazwyY=["nazwa1","nazwa2","nazwa3"];
  @Input()
    selectedID:any=-1;
  @Input()
    opcje: EChartsOption= {};
  @Input()
    odswiez:boolean=false;
  @Output() odswiezChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  krokiTab=[1,5,10,20];

  changeOdswiez() {
   // this.odswiez=false;
    this.setupOptions();
    console.log(this.dane);
   // console.log("changeSekundy "+s);
    this.odswiezChange.emit(this.odswiez);
  }
  
  setupOptions()
  {
   this.opcje= {
    tooltip: {
        formatter: function (params:any) {
          let nazwaSekcji=params.name;
          let start=params.value[1];
          let dlugosc=params.value[3];
          let marker=params.marker;
        //  console.log(params.value);
          return  marker+nazwaSekcji+'<br> start: '+start+'<br> czas trwania: '+dlugosc+'<br> koniec o: '+(start+dlugosc);
          ;
        }
    },
    
    title: {
      text: 'Przebieg programu',
      subtext: 'Kolejne etapy podlewania',
      left: 'center'
    },
   
    grid: {
      height: 300
    },
    xAxis: {
      min: 0,
      scale: true,
      axisLabel: {
        formatter: function (val:any) {
      //    console.log(val);
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
        
        
      }
    },
    yAxis: {
      data: this.nazwyY
    },
    series: [
      {
        type: 'custom',
        renderItem: this.renderItem.bind(this),
        itemStyle: { opacity: 0.8 },
        encode: { x: [1, 2], y: 0 , tooltip:[3,4]},
        data: this.dane,
      //  emphasis: this.emphasisStyle
      }
    ]
  };
  }


  @Output() readonly clickAction: EventEmitter<unknown> = new EventEmitter<unknown>();

  ngOnChanges(a:any):void{
   console.log("wkres onChanges, odswiez: "+this.odswiez);
   this.changeOdswiez();
   this.setupOptions();
  }

  onChartClick(event: unknown): void {
    this.clickAction.emit(event);
    console.log("wkres klik");
  }

  constructor() { }

  ngOnInit(): void {
    this.setupOptions();
  }
  renderItem (params:any, api:any):CustomSeriesRenderItemReturn {
       
    //      console.log("params: "+ JSON.stringify(params));
      
    var sekcjaIndex = api.value(0);
    var start = api.coord([api.value(1), sekcjaIndex]);
    var end = api.coord([api.value(2), sekcjaIndex]);
    var dlugosc= api.value(3);
    var sekwencjaId= api.value(5);
    var height = api.size([0, 1])[1] * 0.6;
    //console.log("sekcjaIndex: "+api.value(0)+", start: "+api.value(1)+", end: "+api.value(2)+", dlugosc: "+dlugosc+", height: "+height+" sekcja: "+api.value(4));
   // console.log("sekcjaIndex: "+sekcjaIndex+", start: "+start+", end: "+end+", height: "+height+" sekcja: "+api.value(4));

    var rectShape = graphic.clipRectByRect({
        x: start[0],
        y: start[1] - height / 2,
        width: end[0] - start[0],
        height: height
    }, {
        x: params.coordSys.x,
        y: params.coordSys.y,
        width: params.coordSys.width,
        height: params.coordSys.height
    },
    );
  var styl=api.style();
  if(sekwencjaId==this.selectedID)
  {
     styl.fill='#ff0000';
  }

  let h:number=Math.floor(dlugosc/3600);

    let ht:string=h<10?"0"+h:h+"";
    
    let m:number=Math.floor((dlugosc%3600)/60)
    let mt:string=m<10?"0"+m:""+m;
    let s:number=Math.floor((dlugosc%60));
    let st:string=s<10?"0"+s:""+s+"";
    let str= ht+":"+mt+":"+st;
    if(h==0)
      str= mt+"min "+st+"sek";
    if(h==0&&m==0)
      str= st+"sek";

  styl.text=str;//this.getTimeStrig(dlugosc);
    let ret:CustomSeriesRenderItemReturn =  rectShape && {
      type: 'rect',
      shape: rectShape,
      style: styl,
     
  };
  
  return ret;
  }
  getTimeStrig(sekundy?:number):string
  {
    if(!sekundy) return "?";
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
}
