import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  headersOptions;
  constructor(private httpClient: HttpClient) {
    this.headersOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

  addEvent(data: any): void{
    this.httpClient.post<any>(environment.EventApi, data).subscribe(value => {
      console.log(value);
    })
  }
}
