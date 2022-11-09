import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddStudentForm } from '../students/students.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor(public dilaog: MatDialog) { }

  openDialog(): void{
    const dialogRef = this.dilaog.open(AddTeacherForm,{
      width:'400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngOnInit(): void {
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
  constructor(public dialogRef: MatDialogRef<AddTeacherForm>){
    this.addTeacherForm = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("",[Validators.required, Validators.email]),
      password: new FormControl("", Validators.required)
    })
  }

  get formControlles(){
    return this.addTeacherForm.controls;
  }
  getNameErrorMessage(){
    if (this.addTeacherForm.controls['name'].hasError('required')) {
      return 'You must enter a value';
    }
    return this.addTeacherForm.controls['name'].hasError('name') ? 'Not a valid name' : '';
  }
  getEmailErrorMessage() {
    if (this.addTeacherForm.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }
    return this.addTeacherForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.addTeacherForm.controls['password'].hasError('required')) {
      return 'You must enter a value';
    }
    return ''
  }

  onSubmit(): void{
    
  }

  onNoClick():void{
    this.dialogRef.close();
  }
}
