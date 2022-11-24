import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse  } from '@angular/common/http';
import { Observable, OperatorFunction, Subject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Config,Sekcja,System,Program,Sekwencja,Stan, StanSet, StanAll } from 'src/assets/typyObiektow';
import { faTurkishLiraSign } from '@fortawesome/free-solid-svg-icons';



const GET= "/get";
const GET_SYSTEM="/get/system";
const GET_STAN="/get/stany";
const SET_STAN="/set/stan";
const GET_SEKCJE="/get/sekcje";
//const SET_SEKCJE="/set/sekcje";
const SET_SEKCJA="/set/sekcja";
const DEL_SEKCJA="/del/sekcja";
const GET_PROGRAMY="/get/programy";
const SET_PROGRAM="/set/program";
const DEL_PROGRAM="/del/program";
const GET_SEKWENCJE="/get/sekwencje";    
const SET_SEKWENCJA="/set/sekwencja";
const DEL_SEKWENCJA="/del/sekwencja";
const START_PROGRAM="/start/program";
const STOP_PROGRAM="/stop/program";
const CONFIG_URL="/assets/config.json";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private ipUrl=""; // = "http://192.168.1.179"; //'api';//'192.168.4.1';
  
  public czyAutoStan=false;
  public rateAutostan=1;
  timer:any;


  public dniTyg=["Pon","Wt","Śr","Czw","Pt","Sob","Nd"];

  public dajZydIdDnia(d:number):number
  {
    return d==6? 0:d+1;
  }
  public dajPLIdDnia(d:number):number
  {
    return d==0? 6:d-1;
  }
  public dajNazweDnia(d:number):string
  {
    return this.dniTyg[this.dajPLIdDnia(d)];
  }
  
  private sekcjeSubject: Subject<Sekcja[]> = new Subject<Sekcja[]>();
  private systemSubject: Subject<System> = new Subject<System>();
  private programSubject: Subject<Program[]> = new Subject<Program[]>();
  private sekwencjaSubject: Subject<Sekwencja[]> = new Subject<Sekwencja[]>();
  private stanSubject: Subject<StanAll> = new Subject<StanAll>();
  
  private programy:Program[]=[];
  private sekwencje:Sekwencja[]=[];
  
  public sekcje:Sekcja[]=[];
  public system?:System;

  constructor(private http: HttpClient,
    
    //private messageService: MessageServicet
    )
  {
    
      this.getConfig();
      this.getSekcje();
      this.getSystem();
      this.getProgram();
      this.getSekwencje();
      this.getStan();
      this.uruchomAutoStan(this.czyAutoStan,this.rateAutostan);
  }
  
  uruchomAutoStan(czyAktywny:boolean,interwal:number)
  {
    this.czyAutoStan=czyAktywny;
    this.rateAutostan=interwal;
    console.log("AutoStan stop")
    if(this.timer)
      clearInterval(this.timer); 
    
    if(czyAktywny)  
    {
      console.log("AutoStan start: ",interwal);
      this.timer= setInterval(()=>{ this.getStan();},interwal*1000);
    }
  }
  getConfig() {

      return this.http.get<Config>(CONFIG_URL)
      //.pipe(
       // retry(3), // retry a failed request up to 3 times
       // catchError(this.handleError) // then handle the error
    //  )
      .subscribe((data: Config) => {
        console.log('Konfiguracja: '+JSON.stringify(data));
        this.ipUrl=data.ipUrl;
        console.log('Konfiguracja wczytana IP: '+this.ipUrl);
      }
    );
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(CONFIG_URL, { observe: 'response' })
    .pipe(
   //   retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }
  getSekcjeSubject():Subject<Sekcja[]> {return this.sekcjeSubject;}
  getSekcje(): void {
      console.log("Sekcje: "+this.ipUrl+GET_SEKCJE);
      this.http.get<any>(this.ipUrl+GET_SEKCJE)
    /*  .pipe(
     //   retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      )*/

      .subscribe(sekcje =>
        { 
          console.log("Sekcje: "+JSON.stringify(sekcje));
          if(sekcje!=undefined)
          {
            this.sekcje=sekcje;
            this.sekcjeSubject.next(sekcje);   
          }
          
        });
    }
    setSekcja(sekcja:Sekcja): void {
      
      console.log("sendSekcje: "+JSON.stringify(sekcja));
      const options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', }), 
        body: {plain:sekcja},
      };
     
      this.http.post<Sekcja[]>(this.ipUrl+SET_SEKCJA,sekcja)
      .pipe(
   //     retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      )
      .subscribe(sekcje =>
        { 
          this.sekcje=sekcje;
          this.sekcjeSubject.next(sekcje);   
        });
    }
    deleteSekcja(sekcja:Sekcja)
    {

      const options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', }), 
        body: {id: sekcja.sekcjaId },
      };

      console.log("usunSekcje: "+JSON.stringify(sekcja));
      this.http.delete<Sekcja[]>(this.ipUrl+DEL_SEKCJA,options)
      .pipe(
    //    retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      )
      .subscribe(sekcje =>
        { 
          this.sekcjeSubject.next(sekcje);   
        });
    }
  getSystemSubject():Subject<System> {return this.systemSubject;}
  getSystem(): void{
    console.log("getSystem: "+this.ipUrl+GET_SYSTEM);
    this.http.get<System>(this.ipUrl+GET_SYSTEM)
    .pipe(
   //   retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    )
    .subscribe(s =>
      { 
        this.system=s;
        this.systemSubject.next(s);   
      }); 
  }
  getProgramSubject():Subject<Program[]> {return this.programSubject;}
  refreshProgram(p:Program[])
  {
    this.programy=p;
    this.calcCalkowityCzasTrwaniaProgramow();
    this.programSubject.next(p);
  }
  getProgram(): void{
    console.log("getProgram: "+this.ipUrl+GET_PROGRAMY);
    this.http.get<Program[]>(this.ipUrl+GET_PROGRAMY)
    .pipe(
  //    retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    )
    .subscribe(s =>
      { 
        this.refreshProgram(s);
        //this.programSubject.next(s);   
      }); 
  }
  sendProgram(program:Program): void {
      
    console.log("sendProgram: "+JSON.stringify(program));
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }), 
      body: {plain:program},
    };
   
    this.http.post<Program[]>(this.ipUrl+SET_PROGRAM,program)
    .pipe(
 //     retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    )
    .subscribe(program =>
      { 
        this.refreshProgram(program);
        //this.programSubject.next(program);   
      });
  }
  deleteProgram(program:Program)
  {

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }), 
      body: {programId: program.programId },
    };

    console.log("usunProgram: "+JSON.stringify(program));
    this.http.delete<Program[]>(this.ipUrl+DEL_PROGRAM,options)
    .pipe(
  //    retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    )
    .subscribe(program =>
      { 
        this.refreshProgram(program);
        //this.programSubject.next(program);   
      });
  }
  
  getSekwencjeSubject():Subject<Sekwencja[]> {return this.sekwencjaSubject;}
  refreshSekwencja(sek:Sekwencja[])
  {
    if(sek)
    {
      this.sekwencje=sek;
      this.refreshProgram(this.programy);
      this.sekwencjaSubject.next(sek);   
    }
    else
      console.log("Brak sekwencji");
  }
  getSekwencje(): void{
    console.log("getSekwencje: "+this.ipUrl+GET_SEKWENCJE);
    this.http.get<Sekwencja[]>(this.ipUrl+GET_SEKWENCJE)
    .pipe(
  //    retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    )
    .subscribe(s =>
      { 
       this.refreshSekwencja(s);
      }); 
  }
  sendSekwencja(sekw:Sekwencja)
  {
    console.log("sendSekwencja: "+JSON.stringify(sekw));
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }), 
      body: {plain:sekw},
    };
    let req= this.http.put<Sekwencja[]>(this.ipUrl+SET_SEKWENCJA,sekw);
    if(sekw.sekwencjaId<0)
      req= this.http.post<Sekwencja[]>(this.ipUrl+SET_SEKWENCJA,sekw);
    
    req  
    .pipe(
 //     retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    )
    .subscribe(s =>
      { 
        this.refreshSekwencja(s); 
      });
  }
  deleteSekwencja(sekwencjaId:number)
  {

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }), 
      body: {sekwencjaId: sekwencjaId },
    };

    console.log("usunSekwencje: "+JSON.stringify(sekwencjaId));
    this.http.delete<Sekwencja[]>(this.ipUrl+DEL_SEKWENCJA,options)
    .pipe(
  //    retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    )
    .subscribe(s =>
      { 
        this.refreshSekwencja(s); 
        //this.programSubject.next(program);   
      });
  }
  getStanSubject():Subject<StanAll> {return this.stanSubject;}
  getStan(): void{
    console.log("getStan: "+this.ipUrl+GET_STAN);
    this.http.get<StanAll>(this.ipUrl+GET_STAN/*,{params:{plain:"stan"}}*/)
    .pipe(
   //   retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    )
    .subscribe(s =>
      { 
        if(s)
        {
          s.sekcje=s.sekcje.sort((a,b)=>a.sekcjaId-b.sekcjaId);
          this.stanSubject.next(s);   
          
        }else
        {
          console.log("brak stanow");
        }
      }); 
  }
  setStan(stan:StanSet):void{
        
    console.log("sendSekcje: "+JSON.stringify(stan));
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }), 
    //  body: {plain:stan}
    };
       
    this.http.post<StanAll>(this.ipUrl+SET_STAN,stan,options)
    .pipe(
 //     retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    )
    .subscribe(stan =>
      { 
        console.log(stan)
        stan.sekcje=stan.sekcje.sort((a,b)=>a.sekcjaId-b.sekcjaId);
        this.stanSubject.next(stan);   
      });
  }

  startProgram(programId:number,korekta:number)
  {
    console.log("startProgram: "+programId,korekta);
    const options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', }), 
    };
    const  body= {
        programId:programId,
        korekta:korekta
      };
   
    this.http.post<any>(this.ipUrl+START_PROGRAM,body,options) 
    .pipe(
 //     retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    )
    .subscribe(s =>
      { 
        //this.refreshSekwencja(s); 
      });
  }

  getTimeStrig(sekundy?:number):string
{
  if(sekundy==undefined) return "?";
  let isMinus=false;
  if(sekundy<0) isMinus=true;
  
  let h:number=Math.floor(sekundy/3600);
  if(isMinus) h=Math.ceil(sekundy/3600);

  let ht:string=Math.abs(h)<10?"0"+Math.abs(h):Math.abs(h)+"";
  
  let m:number=Math.floor((sekundy%3600)/60)
  if(isMinus) m=Math.ceil((sekundy%3600)/60);

  let mt:string=Math.abs(m)<10?"0"+Math.abs(m):""+Math.abs(m);

  let s:number=Math.floor((sekundy%60));
  s=Math.abs(s);
  
  let st:string=s<10?"0"+s:""+s+"";
  let str= (isMinus?"-":"")+ ht+"h "+mt+"m "+st+"s ";
  if(h==0)
    str=(isMinus?"-":"")+ mt+"m "+st+"s";
  if(h==0&&m==0)
    str=(isMinus?"-":"")+ st+"s";
  return str;
}
  calcCzasTrwaniaProgramu(p:Program):number
  {
    let sek=this.sekwencje.filter(s=>s.programId==p.programId);
    //sek=sek.sort((a,b)=>a.startAkcji-b.startAkcji);
    let czas=0;
    sek.forEach(e => {
      if(e.startAkcji+e.czasTrwaniaAkcji>czas)
        czas=e.startAkcji+e.czasTrwaniaAkcji;
    });
    return czas;
  }
  calcCalkowityCzasTrwaniaProgramow()
  {
    this.programy.forEach(p => {
      p.calkowityCzasTrwaniaProgramu=this.calcCzasTrwaniaProgramu(p);
    });
    console.log(this.programy);
  }
}
