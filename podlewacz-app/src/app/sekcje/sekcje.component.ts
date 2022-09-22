import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Sekcja } from 'src/assets/typyObiektow';

@Component({
  selector: 'app-sekcje',
  templateUrl: './sekcje.component.html',
  styleUrls: ['./sekcje.component.scss']
})
export class SekcjeComponent implements OnInit {
  sekcje: Sekcja[]=[];
  selectedSekcja?: Sekcja;
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.apiService.getSekcjeSubject().subscribe(s => {this.sekcje=s;});
  }
  onSelect(sekcja: Sekcja): void {
    this.selectedSekcja = sekcja;
  }
  
}
