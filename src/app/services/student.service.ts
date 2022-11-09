import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  students: BehaviorSubject<Student[]>;

  constructor(private httpClient: HttpClient) {
    this.students = new BehaviorSubject<Student[]>([]);
  }

  getStudents(): BehaviorSubject<Student[]>{
    this.httpClient.get<Student[]>(environment.StudentApi).subscribe(value => {
      this.students.next(value);
    })
    return this.students;
  }
}
