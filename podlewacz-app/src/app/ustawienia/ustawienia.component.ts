import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-ustawienia',
  templateUrl: './ustawienia.component.html',
  styleUrls: ['./ustawienia.component.scss']
})
export class UstawieniaComponent implements OnInit {

  wybranyTab:any;
  constructor(private apiService:ApiService ) { }

  ngOnInit(): void {
    this.pobierzDane(-1);
  }
  pobierzDane(i:number)
  {
    switch(i)
    {
      case 0:
         this.apiService.getSekcje();
        break;
      case 1:
         this.apiService.getProgram();
        break;
      case 2:
         this.apiService.getProgram();
         this.apiService.getSekwencje();
         this.apiService.getSekcje();
        break;
      default:
        this.apiService.getSekcje();
        this.apiService.getProgram();
        this.apiService.getSekwencje();
        this.apiService.getSystem();
    }
    
  }
  tabSelectedTabChange(e:any)
  {
    this.wybranyTab=e;
    console.log("wybrany tab: ",e);
    this.pobierzDane(e.index);
   
  }
}
