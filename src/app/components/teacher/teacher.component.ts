import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Teacher } from 'src/app/interfaces/teacher';
import { TeacherService } from 'src/app/services/teacher.service';
import { DeleteDialog } from '../dashbord/dashbord.component';
import { AddStudentForm } from '../students/students.component';


@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'subject','action'];
  dataSource = new MatTableDataSource<Teacher>([]);
  constructor(public dilaog: MatDialog, private teacherService: TeacherService) { }

  openDialog(): void{
    const dialogRef = this.dilaog.open(AddTeacherForm,{
      width:'400px',
      data: {teacher: null}
    });
  }

  update(teacher: Teacher){
    this.dilaog.open(AddTeacherForm,{
      width:'400px',
      data: {teacher: teacher}
    })
  }

  delete(id: string){
    const ref = this.dilaog.open(DeleteDialog, {
      data: { message: 'You are attempting to delete this teacher are you sure that you want to delete it' }
    });

    ref.afterClosed().subscribe(res => {
      if (res === true) {
        this.teacherService.delete(id);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngOnInit(): void {
    this.teacherService.getTeachers().subscribe(value => {
      this.dataSource.data = value;
    })
  }

}

@Component({
  selector: 'add-teacher-form',
  templateUrl: 'add-teacher-form.html',
  styleUrls: ['./teacher.component.scss']
})
export class AddTeacherForm{
  addTeacherForm: FormGroup;
  hide = true;
  constructor(public dialogRef: MatDialogRef<AddTeacherForm>, private teacherService: TeacherService, @Inject(MAT_DIALOG_DATA) public data:{teacher: Teacher}){
    if(data.teacher === null){
      this.addTeacherForm = new FormGroup({
        name: new FormControl("", Validators.required),
        subject: new FormControl("", Validators.required),
        email: new FormControl("",[Validators.required, Validators.email]),
        password: new FormControl("", [Validators.required, Validators.minLength(8)])
      })
    }else{
      this.addTeacherForm = new FormGroup({
        name: new FormControl(data.teacher.name, Validators.required),
        subject: new FormControl(data.teacher.subject, Validators.required),
        email: new FormControl(data.teacher.email,[Validators.required, Validators.email]),
        password: new FormControl(data.teacher.password, [Validators.required, Validators.minLength(8)])
      })
    }
  }

  get formControlles(){
    return this.addTeacherForm.controls;
  }
  getNameErrorMessage(){
    return this.addTeacherForm.controls['name'].hasError('required')? 'You must enter a value': '';
  }
  getEmailErrorMessage() {
    if(this.addTeacherForm.controls['email'].hasError('required')){
      return 'You must enter a value'
    }
   return this.addTeacherForm.controls['email'].hasError('email')?'Not a valid email': '';
  }

  getPasswordErrorMessage() {
    if(this.addTeacherForm.controls['password'].hasError('required')){
      return 'You must enter a value'
    }
    return this.addTeacherForm.controls['password'].hasError('minlength') ?'You must enter at least 8 characters' : '';
  }

  getSubjectErrorMessage() {
    return this.addTeacherForm.controls['subject'].hasError('required') ?'You must enter a value' : '';
  }

  onSubmit(): void{
    if(this.data.teacher === null){
      let teacher: Teacher = {
        name: this.addTeacherForm.controls['name'].value,
        email: this.addTeacherForm.controls['email'].value,
        password: this.addTeacherForm.controls['password'].value,
        subject: this.addTeacherForm.controls['subject'].value
      }
      this.teacherService.addTeacher(teacher);
      this.dialogRef.close();
    }else{
      let teacher: Teacher = {
        _id: this.data.teacher._id,
        name: this.addTeacherForm.controls['name'].value,
        email: this.addTeacherForm.controls['email'].value,
        password: this.addTeacherForm.controls['password'].value,
        subject: this.addTeacherForm.controls['subject'].value
      }
      this.teacherService.updateTeacher(teacher);
      this.dialogRef.close();
    }
  }

  onNoClick():void{
    this.dialogRef.close();
  }
}
