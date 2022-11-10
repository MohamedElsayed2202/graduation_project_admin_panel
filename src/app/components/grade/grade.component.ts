import { Component, OnInit } from '@angular/core';
import { Grade } from 'src/app/interfaces/grade';
import { GradeService } from 'src/app/services/grade.service';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss']
})
export class GradeComponent implements OnInit {

  grades: Grade[] = [];
  constructor(private gradeService: GradeService) { }

  ngOnInit(): void {
    this.gradeService.getGrades().subscribe(value =>{
      this.grades = value;
    })
  }

}
