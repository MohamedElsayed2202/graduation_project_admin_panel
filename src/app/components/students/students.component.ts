import { Component  , Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';


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
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);



  constructor(public dilaog: MatDialog) { }
  
  openDialog(): void{
    const dialogRef = this.dilaog.open(AddStudentForm,{
      width:'400px'
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
    console.log(this.dataSource.data.length);
    
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
  constructor(public dialogRef: MatDialogRef<AddStudentForm>){
    this.addStudentForm = new FormGroup({
      name: new FormControl("", Validators.required),
      userName :new FormControl("", Validators.required),
      email: new FormControl("",[Validators.required, Validators.email]),
      password: new FormControl("", Validators.required)
    })
  }
  get formControlles(){
    return this.addStudentForm.controls;
  }
  getNameErrorMessage(){
    if (this.addStudentForm.controls['name'].hasError('required')) {
      return 'You must enter a value';
    }
    return this.addStudentForm.controls['name'].hasError('name') ? 'Not a valid name' : '';
  }
  getEmailErrorMessage() {
    console.log("mmmm");
    
    if (this.addStudentForm.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }
    return this.addStudentForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.addStudentForm.controls['password'].hasError('required')) {
      return 'You must enter a value';
    }
    return ''
  }
  onNoClick():void{
    this.dialogRef.close();
  }
}
