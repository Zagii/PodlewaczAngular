import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Sekcja } from 'src/assets/typyObiektow';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.scss']
})
export class ManualComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
