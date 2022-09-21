import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse  } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Config,Sekcja,System,Program,Sekwencja,Stan } from 'src/assets/typyObiektow';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private configUrl = 'assets/config.json';
  private ipUrl = 'api';//'192.168.4.1';
  private sekcjeUrl = this.ipUrl+'/sekcje';  // URL to web api
  private systemUrl = this.ipUrl+'/system';
  private programUrl =this.ipUrl+'/programy';
  private sekwencjaUrl =this.ipUrl+'/sekwencje';
  private stanUrl =this.ipUrl+'/stany';
  
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
        console.log('Konfiguracja: '+data);
        this.ipUrl=data.ipUrl;
        this.sekcjeUrl=this.ipUrl+'/sekcje';
        this.systemUrl=this.ipUrl+'/system';
        this.programUrl =this.ipUrl+'/programy';
        this.sekwencjaUrl =this.ipUrl+'/sekwencje';
        this.stanUrl =this.ipUrl+'/stany';
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
      
      this.http.get<Sekcja[]>(this.sekcjeUrl)
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
    this.http.get<System>(this.systemUrl)
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
    this.http.get<Program[]>(this.programUrl)
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
    this.http.get<Sekwencja[]>(this.sekwencjaUrl)
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
    this.http.get<Stan[]>(this.stanUrl)
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
