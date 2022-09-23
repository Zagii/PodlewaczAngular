import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Sekcja } from 'src/assets/typyObiektow';

@Component({
  selector: 'app-sekcje',
  templateUrl: './sekcje.component.html',
  styleUrls: ['./sekcje.component.scss']
})
export class SekcjeComponent implements OnInit {
  typySekcji: string[] = ['Fizyczna', 'RestFull', 'Mqtt'];
  wybranyTyp?: any;
  sekcje: Sekcja[]=[];
  selectedSekcja?: Sekcja;
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.apiService.getSekcjeSubject().subscribe(s => 
      {
        this.sekcje=s;
        this.selectedSekcja=s[0];
        this.wybranyTyp=this.selectedSekcja.typ;
    });
  }
  onSelect(sekcja: Sekcja): void {
    this.selectedSekcja = sekcja;
    this.wybranyTyp = sekcja.typ;
  }
  dodajSekcje()
  {
    console.log("Dodaj sekcje btn");
    let nowaSekcja: Sekcja={
      nazwa:"NowaSekcja",
      typ:0,
      pin: 0,
      inverted:false
    };
  //  this.sekcje.push(nowaSekcja);
    this.selectedSekcja=nowaSekcja;
  }
  
  // Radio Change Event
  onItemChange(typ:any,index:any){
    console.log(typ+" "+index);
    console.log(this.selectedSekcja);
    this.wybranyTyp=index;
  }
  onFormSubmit() {
   //alert(JSON.stringify(this.formGroup.value, null, 2));
   console.log("form submit");
  }
  
}
