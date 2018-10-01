import { Entry } from './models/entry';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuelTrackerService {
  private uriPath = 'api/entries';
  private url = environment.baseUrl + this.uriPath;

  public index(): Observable<Entry[]> {
    return this.http.get<Entry[]>(this.url + '?sorted=true').pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error retrieving Post List: ' + ' Status: ' + err);
      })
    );
  }
  public show(id: number): Observable<Entry> {
    return this.http.get<Entry>('${this.url/:id}').pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          'Error retrieving To do List: ' + ' Status: ' + err.status
        );
      })
    );
  }
  public create(entry: Entry) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.url, entry, httpOptions).pipe(
      catchError((err: any) => {
        console.log(entry);
        return throwError('Error saving Todo: ' + err);
      })
    );
  }
  public update(entry: Entry) {
    const httpOptions = {};
    return this.http
      .put<Entry>(this.url + '/' + entry.id, entry, httpOptions)
      .pipe(
        catchError((err: any) => {
          return throwError('Error updating Todo: ' + err);
        })
      );
  }
  public destroy(id: number) {
    const httpOptions = {};
    return this.http.delete<Entry>(this.url + '/' + id, httpOptions).pipe(
      catchError((err: any) => {
        return throwError('Error deleting Todo: ' + err);
      })
    );
  }

  constructor(private http: HttpClient) {}
}
