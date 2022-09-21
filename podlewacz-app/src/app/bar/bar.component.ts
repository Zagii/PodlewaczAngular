import { Component, OnInit } from '@angular/core';
import { Stan } from 'src/assets/typyObiektow';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  stany:Stan[]=[];

  constructor(private apiService:ApiService) 
  {
      this.apiService.getStanSubject().subscribe(s=>{this.stany=s;});
  }

  ngOnInit(): void {
  }

}
