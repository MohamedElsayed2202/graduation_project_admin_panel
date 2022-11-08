import { Component  , Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

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
      width:'250px'
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
  templateUrl: './add-student-form.html'
})
export class AddStudentForm{
  constructor(public dialogRef: MatDialogRef<AddStudentForm>){}
  onNoClick():void{
    this.dialogRef.close();
  }
}
