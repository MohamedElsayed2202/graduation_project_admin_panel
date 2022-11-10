import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private headerOptions;
  private students: BehaviorSubject<Student[]>;

  constructor(private httpClient: HttpClient) {
    this.students = new BehaviorSubject<Student[]>([]);
    this.headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

  getStudents(): BehaviorSubject<Student[]>{
    this.httpClient.get<Student[]>(environment.StudentApi).subscribe(value => {
      this.students.next(value);
    })
    return this.students;
  }

  addStudent(student: Student):void{
    this.httpClient.post<Student>(environment.StudentApi, JSON.stringify(student), this.headerOptions)
    .subscribe(value => {
      let sts = this.students.value;
      sts.push(value);
      this.students.next(sts);
    })
  }

  updateStudent(student: Student):void{
    this.httpClient.put<Student>(`${environment.StudentApi}/${student._id}`, JSON.stringify(student), this.headerOptions)
    .subscribe(value => {
      let sts = this.students.value
      const index = sts.findIndex(elem => elem._id === value._id);
      sts[index] = value;
      this.students.next(sts);
    })
  }

  delete(id: string): void{
    this.httpClient.delete<string>(`${environment.StudentApi}/${id}`)
    .subscribe(value => {
      let sts = this.students.value.filter(el => el._id !== value);
      this.students.next(sts);
    })
  }
}
