import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TeacherTimeTable } from '../interfaces/teacher-time-table';

@Injectable({
  providedIn: 'root'
})
export class TeacherTimeTableService {
  private headersOptions;
  private tables: BehaviorSubject<TeacherTimeTable[]>

  constructor(private httpClient: HttpClient) {
    this.tables = new BehaviorSubject<TeacherTimeTable[]>([]);
    this.headersOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   }

   getTables():BehaviorSubject<TeacherTimeTable[]>{
    this.httpClient.get<TeacherTimeTable[]>(environment.TeacherTable).subscribe(value => {
      this.tables.next(value);
    });
    return this.tables;
  }

  addTable(table: TeacherTimeTable): void{
    this.httpClient.post<TeacherTimeTable>(environment.TeacherTable, JSON.stringify(table), this.headersOptions)
    .subscribe(value => {
      let tabs = this.tables.value;
      tabs.push(value);
      this.tables.next(tabs);
    })
  }

  updateTable(table: TeacherTimeTable): void{
    this.httpClient.put<TeacherTimeTable>(`${environment.TeacherTable}/${table._id}`, JSON.stringify(table), this.headersOptions)
    .subscribe(value => {
      let tabs = this.tables.value;
      const index = tabs.findIndex(elem => elem._id === value._id);
      tabs[index] = value;
      this.tables.next(tabs);
    })
  }

  deleteTable(id: string):void{
    this.httpClient.delete<string>(`${environment.TeacherTable}/${id}`)
    .subscribe(value => {
      let tabs = this.tables.value.filter(ele => ele._id !== value);
      this.tables.next(tabs);
    })
  }
}
