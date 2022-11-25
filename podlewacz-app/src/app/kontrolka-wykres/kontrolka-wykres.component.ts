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
   formatujOsX:any;
  @Input() 
  nazwyY=["nazwa1","nazwa2","nazwa3"];
  @Input()
    selectedID:any=-1;
  @Input()
    opcje: EChartsOption= {};
  @Input()
    tytul:string="Tytuł";
  @Input()
    podTytul:string="podTytuł";
  @Input()
    odswiez:boolean=false;
  @Input()
  pointerVal:number = -1;
  @Output() odswiezChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  krokiTab=[1,5,10,20];

  changeOdswiez() {
   // this.odswiez=false;
    this.setupOptions();
   // console.log(this.dane);
   // console.log("changeSekundy "+s);
    this.odswiezChange.emit(this.odswiez);
  }
  
  setupOptions()
  {
   let that=this;
   this.opcje= {
    tooltip: {
        formatter: function (params:any) {
          //let txt=params.tooltipTxt;
          /*let nazwaSekcji=params.name;
          let start=params.value[1];
          let dlugosc=params.value[3];
          let opis=params.value[4];
          let marker=params.marker;
          return  marker+nazwaSekcji+'<br> '+opis+'<br> start: '+start+'<br> czas trwania: '+dlugosc+'<br> koniec o: '+(start+dlugosc);
          */
  
          return params.marker+params.data.tooltipTxt;
          ;
        }
    },
    
    title: {
      text: this.tytul,
      subtext: this.podTytul,
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
           if(!that.formatujOsX)
           {
            return val;
           }
           return that.formatujOsX(val);
      //    console.log(val);
         
        }    
      }
      /////////////////
     /* ,   axisPointer: {
        value: this.pointerVal,
       // snap: true,
        lineStyle: {
          color: '#7581BD',
          width: 2
        },*/
       /* label: {
          show: true,
          formatter: function (params) {
            return params.value;
          },
          backgroundColor: '#7581BD'
        },*/
      /*  handle: {
          show: this.pointerVal>0?true:false,
          color: '#7581BD'
        }
      },*/
      ////////////
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
        markLine: {
          symbol:'circle',
          data: [
            {
              name: 'Horizontal line with Y value at 100',
              xAxis: this.pointerVal
          }]
        }
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
      
    var obiektIndex = api.value(0);
    var start = api.coord([api.value(1), obiektIndex]);
    var end = api.coord([api.value(2), obiektIndex]);
    var dlugosc= api.value(3);
    var opis = api.value(4);
    var obiektId= api.value(5);
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
  if(obiektId==this.selectedID)
  {
     styl.fill='#ff0000';
  }
/*
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
*/
  styl.text=opis;//str;//this.getTimeStrig(dlugosc);
    let ret:CustomSeriesRenderItemReturn =  rectShape && {
      type: 'rect',
      shape: rectShape,
      style: styl,
     
  };
  
  return ret;
  }
 
}
