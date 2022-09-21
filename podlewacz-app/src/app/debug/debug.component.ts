import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Sekcja,System } from 'src/assets/typyObiektow';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss']
})
export class DebugComponent implements OnInit {

  sekcje: Sekcja[]=[];
  system: System | undefined;
  constructor(
    private apiService:ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.getSekcjeSubject().subscribe(s => {this.sekcje=s;});
    this.apiService.getSystemSubject().subscribe(s => {this.system=s;});
    
  }
 
  
}
