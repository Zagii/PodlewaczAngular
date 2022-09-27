import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse  } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Config,Sekcja,System,Program,Sekwencja,Stan } from 'src/assets/typyObiektow';


const GET= "/get";
const GET_SYSTEM="/get/system";
const GET_STAN="/get/stan";
const GET_SEKCJE="/get/sekcje";
const SET_SEKCJE="/set/sekcje";
const SET_SEKCJA="/set/sekcja";
const DEL_SEKCJA="/del/sekcja";
const GET_PROGRAMY="/get/programy";
const SET_PROGRAM="/set/program";
const DEL_PROGRAM=" /del/program";
const GET_SEKWENCJE="/get/sekwencje";    
const SET_SEKWENCJA="/set/sekwencja";
const DEL_SEKWENCJA="/del/sekwencja";
const START_PROGRAM="/start/program";
const STOP_PROGRAM="/stop/program";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private configUrl = 'assets/config.json';
  private ipUrl="api"; // = "http://192.168.1.179"; //'api';//'192.168.4.1';
  

  
 

  
  
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
      return this.http.get<Config>(this.configUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      )
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
    return this.http.get<Config>(this.configUrl, { observe: 'response' })
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }
  getSekcjeSubject():Subject<Sekcja[]> {return this.sekcjeSubject;}
  getSekcje(): void {
      
      this.http.get<any>(this.ipUrl+GET_SEKCJE)
      .pipe(
     //   retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      )
      .subscribe(sekcje =>
        { 
          this.sekcjeSubject.next(sekcje.Sekcje);   
        });
    }
    postSekcje(sekcja:Sekcja): void {
      
      console.log("postSekcje: "+JSON.stringify(sekcja));
      this.http.post<Sekcja[]>(this.ipUrl+SET_SEKCJA,sekcja)
      .pipe(
        retry(3), // retry a failed request up to 3 times
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
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      )
      .subscribe(sekcje =>
        { 
          this.sekcjeSubject.next(sekcje);   
        });
    }
  getSystemSubject():Subject<System> {return this.systemSubject;}
  getSystem(): void{
    this.http.get<System>(this.ipUrl+GET_SYSTEM)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    )
    .subscribe(s =>
      { 
        this.systemSubject.next(s);   
      }); 
  }
  getProgramSubject():Subject<Program[]> {return this.programSubject;}
  getProgram(): void{
    this.http.get<Program[]>(this.ipUrl+GET_PROGRAMY)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    )
    .subscribe(s =>
      { 
        this.programSubject.next(s);   
      }); 
  }
  getSekwencjeSubject():Subject<Sekwencja[]> {return this.sekwencjaSubject;}
  getSekwencje(): void{
    this.http.get<Sekwencja[]>(this.ipUrl+GET_SEKWENCJE)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    )
    .subscribe(s =>
      { 
        this.sekwencjaSubject.next(s);   
      }); 
  }
  getStanSubject():Subject<Stan[]> {return this.stanSubject;}
  getStan(): void{
    this.http.get<Stan[]>(this.ipUrl+GET_STAN)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    )
    .subscribe(s =>
      { 
        s=s.sort((a,b)=>a.sekcjaId-b.sekcjaId);
        this.stanSubject.next(s);   
      }); 
  }
}
