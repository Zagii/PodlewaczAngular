import { Component, OnInit } from '@angular/core';
import { Program } from 'src/assets/typyObiektow';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-programy',
  templateUrl: './programy.component.html',
  styleUrls: ['./programy.component.scss']
})
export class ProgramyComponent implements OnInit {
  zmieniany:boolean=false;
  selectedProgram?:Program;
  programy:Program[]=[];
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
  }
  onChange(event:any)
  {
    this.zmieniany=true;
  }
  dodajProgram()
  {
    console.log("Dodaj program btn");
    if(this.zmieniany)
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
    let nowyProgram: Program={
      nazwa:"NowyProgram",
      dni: "0000000",
      aktywny:false
    };
 
 
    this.selectedProgram=nowyProgram;
    this.zmieniany=true;
  }
  analujZmiany()
  {
    this.apiService.getProgram();
    this.zmieniany=false;
  }
  usunProgram()
  {
   if(confirm("Czy napewno chcesz usunąć sekcję: "+this.selectedProgram?.nazwa)) 
   {
    if(this.selectedProgram)
      this.apiService.deleteProgram(this.selectedProgram);
    this.zmieniany=false;
   }else
   {
    console.log("anulowano usunProgram");
   }
  }
  wyslijZmiany()
  {
    if(this.selectedProgram)
      this.apiService.sendProgram(this.selectedProgram);
    else
     console.log(this.selectedProgram);
  }
}
