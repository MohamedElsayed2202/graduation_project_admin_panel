import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/interfaces/student';
import { StudentService } from 'src/app/services/student.service';
import { DeleteDialog } from '../dashbord/dashbord.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'grade', 'action'];
  dataSource = new MatTableDataSource<Student>([]);

  constructor(public dilaog: MatDialog, private studentService: StudentService) { }

  openDialog(): void {
    const dialogRef = this.dilaog.open(AddStudentForm, {
      width: '400px',
      data: { student: null }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  update(student: Student) {
    this.dilaog.open(AddStudentForm, {
      width: '400px',
      data: { student: student }
    })
  }

  delete(id: string) {
    const ref = this.dilaog.open(DeleteDialog, {
      data: { message: 'You are attempting to delete this student are you sure that you want to delete it' }
    });

    ref.afterClosed().subscribe(res => {
      if (res === true) {
        this.studentService.delete(id);
      }
    })
  }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(value => {
      this.dataSource.data = value;
    })
  }

}

@Component({
  selector: 'add-student-form',
  templateUrl: './add-student-form.html',
  styleUrls: ['./students.component.scss']
})
export class AddStudentForm {
  addStudentForm: FormGroup;
  hide = true;
  grade: string = '';
  constructor(public dialogRef: MatDialogRef<AddStudentForm>,
    private studentService: StudentService,
    @Inject(MAT_DIALOG_DATA) public data: { student: Student }) {
    if (data.student === null) {
      this.addStudentForm = new FormGroup({
        name: new FormControl("", Validators.required),
        grade: new FormControl("", Validators.required),
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [Validators.required, Validators.minLength(8)])
      })
    } else {
      this.addStudentForm = new FormGroup({
        name: new FormControl(data.student.name, Validators.required),
        grade: new FormControl(data.student.grade, Validators.required),
        email: new FormControl(data.student.email, [Validators.required, Validators.email]),
        password: new FormControl(data.student.password, [Validators.required, Validators.minLength(8)])
      })
    }

  }
  get formControlles() {
    return this.addStudentForm.controls;
  }
  getNameErrorMessage() {
    return this.addStudentForm.controls['name'].hasError('required') ? 'You must enter a value' : '';
  }
  getGradeErrorMessage() {
    return this.addStudentForm.controls['grade'].hasError('required') ? 'You must select a grade' : '';
  }
  getEmailErrorMessage() {
    if (this.addStudentForm.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }
    return this.addStudentForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.addStudentForm.controls['password'].hasError('required')) {
      return 'You must enter a value'
    }
    return this.addStudentForm.controls['password'].hasError('minlength') ? 'You must enter at least 8 characters' : '';

  }

  onSubmit(): void {
    if (this.data.student === null) {
      let student: Student = {
        name: this.addStudentForm.controls['name'].value,
        email: this.addStudentForm.controls['email'].value,
        password: this.addStudentForm.controls['password'].value,
        grade: this.addStudentForm.controls['grade'].value
      }
      this.studentService.addStudent(student);
      this.dialogRef.close();
    } else {
      let student: Student = {
        _id: this.data.student._id,
        name: this.addStudentForm.controls['name'].value,
        email: this.addStudentForm.controls['email'].value,
        password: this.addStudentForm.controls['password'].value,
        grade: this.addStudentForm.controls['grade'].value
      }
      this.studentService.updateStudent(student);
      this.dialogRef.close();
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
