import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Classtimetable } from '../interfaces/classtimetable';

@Injectable({
  providedIn: 'root'
})
export class ClasstimatableService {
  private headersOptions;
  private tables: BehaviorSubject<Classtimetable[]>
  constructor(private httpClient: HttpClient) { 
    this.tables = new BehaviorSubject<Classtimetable[]>([]);
    this.headersOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

  getTables():BehaviorSubject<Classtimetable[]>{
    this.httpClient.get<Classtimetable[]>(environment.ClassTable).subscribe(value => {
      this.tables.next(value);
    });
    return this.tables;
  }

  addTable(table: Classtimetable): void{
    this.httpClient.post<Classtimetable>(environment.ClassTable, JSON.stringify(table), this.headersOptions)
    .subscribe(value => {
      let tabs = this.tables.value;
      tabs.push(value);
      this.tables.next(tabs);
    })
  }

  updateTable(table: Classtimetable): void{
    this.httpClient.put<Classtimetable>(`${environment.ClassTable}/${table._id}`, JSON.stringify(table), this.headersOptions)
    .subscribe(value => {
      let tabs = this.tables.value;
      const index = tabs.findIndex(elem => elem._id === value._id);
      tabs[index] = value;
      this.tables.next(tabs);
    })
  }

  deleteTable(id: string):void{
    this.httpClient.delete<string>(`${environment.ClassTable}/${id}`)
    .subscribe(value => {
      let tabs = this.tables.value.filter(ele => ele._id !== value);
      this.tables.next(tabs);
    })
  }
}
