import { Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData, Sekwencja } from 'src/assets/typyObiektow';
import { SekwencjeComponent } from '../sekwencje/sekwencje.component';



@Component({
  selector: 'app-dialog-sekwencje',
  templateUrl: './dialog-sekwencje.component.html',
  styleUrls: ['./dialog-sekwencje.component.scss']
})
export class DialogSekwencjeComponent {

  sekwencja:Sekwencja;
  constructor(
    public dialogRef: MatDialogRef<SekwencjeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    data.result.ret="OK";
    console.log("dialog");
    console.log(data);
    this.sekwencja=data.data;
  }

  onNoClick(): void {
    this.data.result.ret='Cancel';
    this.dialogRef.close(this.data);
  
  }
  onUsunClick(): void {
   this.data.result.ret='Delete';
    this.dialogRef.close(this.data);
  
  }
}