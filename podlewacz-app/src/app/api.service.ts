import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse  } from '@angular/common/http';
import { Observable, OperatorFunction, Subject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Config,Sekcja,System,Program,Sekwencja,Stan } from 'src/assets/typyObiektow';



const GET= "/get";
const GET_SYSTEM="/get/system";
const GET_STAN="/get/stan";
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
  

  
 

  
  
  private sekcjeSubject: Subject<Sekcja[]> = new Subject<Sekcja[]>();
  private systemSubject: Subject<System> = new Subject<System>();
  private programSubject: Subject<Program[]> = new Subject<Program[]>();
  private sekwencjaSubject: Subject<Sekwencja[]> = new Subject<Sekwencja[]>();
  private stanSubject: Subject<Stan[]> = new Subject<Stan[]>();
  

  

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
            this.sekcjeSubject.next(sekcje);   
          }
          
        });
    }
    sendSekcje(sekcja:Sekcja): void {
      
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
        this.systemSubject.next(s);   
      }); 
  }
  getProgramSubject():Subject<Program[]> {return this.programSubject;}
  getProgram(): void{
    console.log("getProgram: "+this.ipUrl+GET_PROGRAMY);
    this.http.get<Program[]>(this.ipUrl+GET_PROGRAMY)
    .pipe(
  //    retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    )
    .subscribe(s =>
      { 
        this.programSubject.next(s);   
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
        this.programSubject.next(program);   
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
        this.programSubject.next(program);   
      });
  }
  getSekwencjeSubject():Subject<Sekwencja[]> {return this.sekwencjaSubject;}
  getSekwencje(): void{
    console.log("getSekwencje: "+this.ipUrl+GET_SEKWENCJE);
    this.http.get<Sekwencja[]>(this.ipUrl+GET_SEKWENCJE)
    .pipe(
  //    retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    )
    .subscribe(s =>
      { 
        if(s)
         this.sekwencjaSubject.next(s);   
       else
       console.log("Brak sekwencji");
      }); 
  }
  getStanSubject():Subject<Stan[]> {return this.stanSubject;}
  getStan(): void{
    console.log("getStan: "+this.ipUrl+GET_STAN);
    this.http.get<Stan[]>(this.ipUrl+GET_STAN,{params:{plain:"stan"}})
    .pipe(
   //   retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    )
    .subscribe(s =>
      { 
        if(s)
        {
          s=s.sort((a,b)=>a.sekcjaId-b.sekcjaId);
          this.stanSubject.next(s);   
        }else
        {
          console.log("brak stanow");
        }
      }); 
  }
}
