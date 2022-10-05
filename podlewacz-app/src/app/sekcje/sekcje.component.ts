import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Sekcja } from 'src/assets/typyObiektow';

@Component({
  selector: 'app-sekcje',
  templateUrl: './sekcje.component.html',
  styleUrls: ['./sekcje.component.scss']
})
export class SekcjeComponent implements OnInit {
  zmieniana:boolean=false;
  typySekcji: string[] = ['Fizyczna', 'RestFull', 'Mqtt'];
  wybranyTyp?: any;
  sekcje: Sekcja[]=[];
  selectedSekcja?: Sekcja;
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.apiService.getSekcjeSubject().subscribe(s => 
      {
        this.sekcje=s;
        this.selectedSekcja=JSON.parse(JSON.stringify(s[0]));//s[0];
        this.zmieniana=false;
        if(this.selectedSekcja?.typ)
          this.wybranyTyp=this.selectedSekcja.typ;
    });
  }
  onSelect(sekcja: Sekcja): void {
    if(this.zmieniana)
    {
      // wykryto zmiane
      if(confirm("Wykryto niezapisane zmiany \nw ustawieniach sekcji "+this.selectedSekcja?.nazwa+" czy chcesz je zapisać?")) {
        console.log("zapis post");
        this.wyslijZmiany();
      }else
      {
        //anuluj zmiany
        this.analujZmiany();
      }
    }
    this.selectedSekcja = JSON.parse(JSON.stringify(sekcja));//sekcja;
    this.wybranyTyp = sekcja.typ;
  }
  dodajSekcje()
  {
    console.log("Dodaj sekcje btn");
    if(this.zmieniana)
    {
      // wykryto zmiane
      if(confirm("Wykryto niezapisane zmiany \nw ustawieniach sekcji "+this.selectedSekcja?.nazwa+" czy chcesz je zapisać?")) {
        console.log("zapis post");
        this.wyslijZmiany();
      }else
      {
        //anuluj zmiany
        this.analujZmiany();

      }
    }
    let nowaSekcja: Sekcja={
      nazwa:"NowaSekcja",
      typ:0,
      pin: 0,
      inverted:false
    };
    this.wybranyTyp=nowaSekcja.typ;
  //  this.sekcje.push(nowaSekcja);
    this.selectedSekcja=nowaSekcja;
    this.zmieniana=true;
  }
  
  // Radio Change Event
  onItemChange(typ:any,index:any){
    console.log(typ+" "+index);
    console.log(this.selectedSekcja);
    this.wybranyTyp=index;
    this.onChange(1);
  }
  onChange(event:any)
  {
    this.zmieniana=true;
  }
  onFormSubmit() {
   //alert(JSON.stringify(this.formGroup.value, null, 2));
   this.zmieniana=false;
   console.log("form submit");
  }
  wyslijZmiany()
  {
    //post
    //this.selectedSekcja = JSON.parse(JSON.stringify(sekcja));
    if(this.selectedSekcja)
      {
        this.apiService.sendSekcje(this.selectedSekcja);
        this.zmieniana=false;
      }
    else
     console.log(this.selectedSekcja);
  }
  analujZmiany()
  {
    this.apiService.getSekcje();
    this.zmieniana=false;
  }
  usunSekcje()
  {
   if(confirm("Czy napewno chcesz usunąć sekcję: "+this.selectedSekcja?.nazwa)) 
   {
    if(this.selectedSekcja)
      this.apiService.deleteSekcja(this.selectedSekcja);
    this.zmieniana=false;
   }else
   {
    console.log("anulowano usunSekcje");
   }
  }
}
