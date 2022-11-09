import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Grade } from '../interfaces/grade';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  grades: BehaviorSubject<Grade[]>;
  headersOptions;
  constructor(private httpClient: HttpClient) { 
    this.grades = new BehaviorSubject<Grade[]>([]);
    this.headersOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

  getGrades(): BehaviorSubject<Grade[]>{
    this.httpClient.get<Grade[]>(environment.GradeApi).subscribe(value =>{
      this.grades.next(value);
    })
    return this.grades;
  }

  addGrade(grade: Grade):void{
    this.httpClient.post<Grade>(environment.GradeApi, JSON.stringify(grade), this.headersOptions);
  }
}
