import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Events } from '../interfaces/events';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private headersOptions;
  private events: BehaviorSubject<Events[]>
  constructor(private httpClient: HttpClient) {
    this.headersOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.events = new BehaviorSubject<Events[]>([]);
  }

  addEvent(data: any): void{
    this.httpClient.post<Events>(environment.EventApi, data).subscribe(value => {
      let eves = this.events.value;
      eves.push(value);
      this.events.next(eves);
    })
  }

  getEvents(): BehaviorSubject<Events[]>{
    this.httpClient.get<Events[]>(environment.EventApi).subscribe(value => {
      this.events.next(value);
    });
    return this.events;
  }

  updateEvent(id: string, data: any): void{
    this.httpClient.put<Events>(`${environment.EventApi}/${id}`, data).subscribe(value => {
      let eves = this.events.value;
      const index = eves.findIndex(elm => elm._id === id);
      eves[index] = value;
      this.events.next(eves );
    })
  }
  delete(id: string):void{
    this.httpClient.delete<string>(`${environment.EventApi}/${id}`).subscribe(value => {
      let eves = this.events.value.filter(el => el._id !== value);
      this.events.next(eves);
    })
  }
}
