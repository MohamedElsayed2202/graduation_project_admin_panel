import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Teacher } from '../interfaces/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private teachers: BehaviorSubject<Teacher[]>;
  private headerOptions;
  constructor(private httpClient: HttpClient) {
    this.teachers = new BehaviorSubject<Teacher[]>([]);
    this.headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   }

   getTeachers(): BehaviorSubject<Teacher[]>{
    this.httpClient.get<Teacher[]>(environment.TeacherApi)
    .subscribe(value => {
      this.teachers.next(value);
    });
    return this.teachers;
   }

   addTeacher(teacher: Teacher): void{
    this.httpClient.post<Teacher>(environment.TeacherApi, JSON.stringify(teacher), this.headerOptions)
    .subscribe(value => {
      let tec = this.teachers.value;
      tec.push(value);
      this.teachers.next(tec);
    })
   }

   updateTeacher(teacher: Teacher):void{
    this.httpClient.put<Teacher>(`${environment.TeacherApi}/${teacher._id}`, JSON.stringify(teacher), this.headerOptions)
    .subscribe(value => {
      let tec = this.teachers.value
      const index = tec.findIndex(elem => elem._id === value._id);
      tec[index] = value;
      this.teachers.next(tec);
    })
  }

  delete(id: string): void{
    this.httpClient.delete<string>(`${environment.TeacherApi}/${id}`)
    .subscribe(value => {
      let tec = this.teachers.value.filter(el => el._id !== value);
      this.teachers.next(tec);
    })
  }
}
