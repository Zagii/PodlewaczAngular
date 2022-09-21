import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Sekcja } from '../assets/typyObiektow';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const sekcje = [
      { id: 0, nazwa: 'Pompa', typ:1, pin:1 },
      { id: 1, nazwa: 'Sekcja 1', typ:0, pin:0 },
      { id: 2, nazwa: 'Sekcja 2', typ:0, pin:1 },
      { id: 3, nazwa: 'Sekcja 3', typ:0, pin:2 },
      { id: 4, nazwa: 'Sekcja 4' , typ:0, pin:3},
      { id: 5, nazwa: 'Sekcja 5', typ:0, pin:4 },
      { id: 6, nazwa: 'Sekcja 6', typ:0, pin:5 },
      { id: 7, nazwa: 'Sekcja 7', typ:0, pin:6 },
      { id: 7, nazwa: 'Sekcja 8', typ:0, pin:7 }
    ];
    const system =
      {ntpHost:'ntpHost', ntpOffset:-1, useNtp:1, lat:'12.3', lon:'55.322', mqttHost:'mqttHost',
      mqttPort:1883,  mqttUser:'mqttUsr',mqttPwd:'mqttPwd'};

    const programy=[
      {nazwa:'program1', id: 1, dni: '1010101',  lastProgramRun:0,  aktywny:true, godzinyTab:[600,1200,1500]},
      {nazwa:'program2', id: 2, dni: '0101010',  lastProgramRun:0,  aktywny:true, godzinyTab:[800,1233,1733]},
      {nazwa:'program3', id: 3, dni: '0000111',  lastProgramRun:0,  aktywny:true, godzinyTab:[100,2300]},
      {nazwa:'program4', id: 4, dni: '1110000',  lastProgramRun:0,  aktywny:true, godzinyTab:[300,1900]},
    ];
    const sekwencje=[
      {programId:1, sekwencjaId:0, sekcjaId:0, akcja:true, czasTrwaniaAkcji:10, startAkcji:5, sekwencjaLastRun:0},
      {programId:1,sekwencjaId:1, sekcjaId:1, akcja:true, czasTrwaniaAkcji:15, startAkcji:25, sekwencjaLastRun:0},
      {programId:1,sekwencjaId:2, sekcjaId:2, akcja:true, czasTrwaniaAkcji:5, startAkcji:15, sekwencjaLastRun:0},
      {programId:2,sekwencjaId:3, sekcjaId:1, akcja:true, czasTrwaniaAkcji:10, startAkcji:5, sekwencjaLastRun:0},
      {programId:2,sekwencjaId:4, sekcjaId:2, akcja:true, czasTrwaniaAkcji:10, startAkcji:15, sekwencjaLastRun:0},
      {programId:2,sekwencjaId:5, sekcjaId:0, akcja:true, czasTrwaniaAkcji:10, startAkcji:25, sekwencjaLastRun:0},
      {programId:3,sekwencjaId:0, sekcjaId:0, akcja:true, czasTrwaniaAkcji:5, startAkcji:5, sekwencjaLastRun:0},
      {programId:3,sekwencjaId:1, sekcjaId:1, akcja:true, czasTrwaniaAkcji:3, startAkcji:21, sekwencjaLastRun:0},
      {programId:3,sekwencjaId:2, sekcjaId:2, akcja:true, czasTrwaniaAkcji:1, startAkcji:13, sekwencjaLastRun:0},
      {programId:4,sekwencjaId:3, sekcjaId:1, akcja:true, czasTrwaniaAkcji:2, startAkcji:1, sekwencjaLastRun:0},
      {programId:4,sekwencjaId:4, sekcjaId:2, akcja:true, czasTrwaniaAkcji:3, startAkcji:12, sekwencjaLastRun:0},
      {programId:4,sekwencjaId:5, sekcjaId:0, akcja:true, czasTrwaniaAkcji:30, startAkcji:0, sekwencjaLastRun:0},
    ];
    const stany=[
      {sekcjaId:0, stan:true},{sekcjaId:4, stan:true},{sekcjaId:8, stan:false},
      {sekcjaId:1, stan:false},{sekcjaId:5, stan:true},
      {sekcjaId:2, stan:true},{sekcjaId:6, stan:false},
      {sekcjaId:3, stan:false},{sekcjaId:7, stan:true},
    ]

    return {sekcje,system,programy,sekwencje,stany};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(sekcje: Sekcja[]): number {
    return sekcje.length > 0 ? Math.max(...sekcje.map(sekcja => sekcja.id)) + 1 : 11;
  }
}