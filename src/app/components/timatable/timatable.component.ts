import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Classtimetable } from 'src/app/interfaces/classtimetable';
import { Teacher } from 'src/app/interfaces/teacher';
import { TeacherTimeTable } from 'src/app/interfaces/teacher-time-table';
import { ClasstimatableService } from 'src/app/services/classtimatable.service';
import { TeacherTimeTableService } from 'src/app/services/teacher-time-table.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { DeleteDialog } from '../dashbord/dashbord.component';

@Component({
  selector: 'app-timatable',
  templateUrl: './timatable.component.html',
  styleUrls: ['./timatable.component.scss']
})
export class TimatableComponent implements OnInit {
  displayedColumns: string[] = ['day', '8-8.45', '8.45-9.30', '9.30-10.15', '10.15-11', '11.15-12', '12-12.45', '12.45-1.30'];
  teachersDisplayedColumns: string[] = ['day', '1', '2', '3', '4', '5', '6'];
  classesDataSources: MatTableDataSource<any>[] = [];
  teachersDataSources: MatTableDataSource<any>[] = [];
  classTables: Classtimetable[] = [];
  teachersTables: TeacherTimeTable[] = [];
  constructor(
    public dialog: MatDialog,
    private classTimeTable: ClasstimatableService,
    private teacherTimeTable: TeacherTimeTableService
  ) { }

  ngOnInit(): void {
    this.classTimeTable.getTables().subscribe(value => {
      this.classTables = value;
      this.classTables.forEach(element => {
        const dataSource = new MatTableDataSource<any>([]);
        dataSource.data = element.timeTable;
        this.classesDataSources.push(dataSource);
      });
    });
    this.teacherTimeTable.getTables().subscribe(value => {
      this.teachersTables = value;
      this.teachersTables.forEach(element => {
        const dataSource = new MatTableDataSource<any>([]);
        dataSource.data = element.timeTable;
        this.teachersDataSources.push(dataSource);
      });
    })
  }

  openClassDialog() {
    const dialogRef = this.dialog.open(AddClassTableForm, {
      width: '1000px',
      data: { table: null }
    })
  }

  openEditeClassDialog(table: Classtimetable) {
    const dialogRef = this.dialog.open(AddClassTableForm, {
      width: '1000px',
      data: { table: table }
    })
  }

  openTeacherDialog() {
    const dialogRef = this.dialog.open(AddTeacherTableForm, {
      width: '1000px',
      data: { table: null }
    })
  }

  openEditeTeacherDialog(table: TeacherTimeTable) {
    const dialogRef = this.dialog.open(AddTeacherTableForm, {
      width: '1000px',
      data: { table: table }
    })
  }
}

@Component({
  selector: 'add-class-table-form',
  templateUrl: './add-class-table-form.html',
  styleUrls: ['./timatable.component.scss']
})
export class AddClassTableForm {
  displayedColumns: string[] = ['day', '8-8.45', '8.45-9.30', '9.30-10.15', '10.15-11', '11.15-12', '12-12.45', '12.45-1.30'];
  table: Classtimetable = {
    grade: '',
    timeTable: []
  };
  dataSource = new MatTableDataSource<any>([]);
  addTableForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddClassTableForm>,
    public dialog: MatDialog,
    private classTimeTable: ClasstimatableService,
    @Inject(MAT_DIALOG_DATA) public data: { table: Classtimetable }
  ) {
    if (data.table === null) {
      this.addTableForm = new FormGroup({
        grade: new FormControl("", Validators.required),
        day: new FormControl("", Validators.required),
        1: new FormControl("", Validators.required),
        2: new FormControl("", Validators.required),
        3: new FormControl("", Validators.required),
        4: new FormControl("", Validators.required),
        5: new FormControl("", Validators.required),
        6: new FormControl("", Validators.required),
        7: new FormControl("", Validators.required)
      })
      this.dataSource.data = this.table.timeTable
    } else {
      this.addTableForm = new FormGroup({
        grade: new FormControl(data.table.grade, Validators.required),
        day: new FormControl("", Validators.required),
        1: new FormControl("", Validators.required),
        2: new FormControl("", Validators.required),
        3: new FormControl("", Validators.required),
        4: new FormControl("", Validators.required),
        5: new FormControl("", Validators.required),
        6: new FormControl("", Validators.required),
        7: new FormControl("", Validators.required)
      })
      this.table = data.table;
      this.dataSource.data = data.table.timeTable
    }


  }

  addDay(): void {
    this.table.grade = this.addTableForm.controls['grade'].value;
    const exist = this.table.timeTable.findIndex(ele => ele.day === this.addTableForm.controls['day'].value);
    if (exist > -1) {
      this.table.timeTable[exist].subjects = {
        "1": this.addTableForm.controls['1'].value,
        "2": this.addTableForm.controls['2'].value,
        "3": this.addTableForm.controls['3'].value,
        "4": this.addTableForm.controls['4'].value,
        "5": this.addTableForm.controls['5'].value,
        "6": this.addTableForm.controls['6'].value,
        "7": this.addTableForm.controls['7'].value
      };
    } else {
      this.table.timeTable.push({
        day: this.addTableForm.controls['day'].value, subjects: {
          "1": this.addTableForm.controls['1'].value,
          "2": this.addTableForm.controls['2'].value,
          "3": this.addTableForm.controls['3'].value,
          "4": this.addTableForm.controls['4'].value,
          "5": this.addTableForm.controls['5'].value,
          "6": this.addTableForm.controls['6'].value,
          "7": this.addTableForm.controls['7'].value
        }
      })
    }

    this.dataSource.data = this.table.timeTable;
    this.addTableForm.controls['1'].reset();
    this.addTableForm.controls['2'].reset()
    this.addTableForm.controls['3'].reset()
    this.addTableForm.controls['4'].reset()
    this.addTableForm.controls['5'].reset()
    this.addTableForm.controls['6'].reset()
    this.addTableForm.controls['7'].reset()
    this.addTableForm.controls['day'].reset()
  }

  editeDay(data: any): void {
    this.addTableForm.controls['day'].setValue(data['day'])
    this.addTableForm.controls['1'].setValue(data['subjects']["1"])
    this.addTableForm.controls['2'].setValue(data['subjects']["2"])
    this.addTableForm.controls['3'].setValue(data['subjects']["3"])
    this.addTableForm.controls['4'].setValue(data['subjects']["4"])
    this.addTableForm.controls['5'].setValue(data['subjects']["5"])
    this.addTableForm.controls['6'].setValue(data['subjects']["6"])
    this.addTableForm.controls['7'].setValue(data['subjects']["7"])
  }
  save(): void {
    if (this.data.table === null) {
      this.classTimeTable.addTable(this.table);
    } else {
      this.classTimeTable.updateTable(this.table);
    }
    this.dialogRef.close();
  }

  delete():void{
    const ref = this.dialog.open(DeleteDialog,{
        data: {message: 'You are attempting to delete this table are you sure that you want to delete it'}
    });

    ref.afterClosed().subscribe(res => {
      if(res === true){
        this.classTimeTable.deleteTable(this.table._id!);
        this.dialogRef.close();
      }
    })
  }
}

@Component({
  selector: 'add-teacher-table-form',
  templateUrl: './add-teacher-table-form.html',
  styleUrls: ['./timatable.component.scss']
})
export class AddTeacherTableForm implements OnInit {
  teachers: Teacher[] = [];
  displayedColumns: string[] = ['day', '1', '2', '3', '4', '5', '6'];
  table: TeacherTimeTable = {
    subject: '',
    timeTable: [],
    teacherId: ''
  };
  dataSource = new MatTableDataSource<any>([]);
  addTableForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddTeacherTableForm>,
    public dialog : MatDialog,
    private teacherTimeTable: TeacherTimeTableService,
    private teacherService: TeacherService,
    @Inject(MAT_DIALOG_DATA) public data: { table: TeacherTimeTable }
  ) {
    if (data.table === null) {
      this.addTableForm = new FormGroup({
        subject: new FormControl("", Validators.required),
        day: new FormControl("", Validators.required),
        id: new FormControl("", Validators.required),
        1: new FormControl("", Validators.required),
        2: new FormControl("", Validators.required),
        3: new FormControl("", Validators.required),
        4: new FormControl("", Validators.required),
        5: new FormControl("", Validators.required),
        6: new FormControl("", Validators.required),
      })
      this.dataSource.data = this.table.timeTable
    } else {
      this.addTableForm = new FormGroup({
        subject: new FormControl(data.table.subject, Validators.required),
        day: new FormControl("", Validators.required),
        id: new FormControl(data.table.teacherId, Validators.required),
        1: new FormControl("", Validators.required),
        2: new FormControl("", Validators.required),
        3: new FormControl("", Validators.required),
        4: new FormControl("", Validators.required),
        5: new FormControl("", Validators.required),
        6: new FormControl("", Validators.required),
      })
      this.dataSource.data = data.table.timeTable;
      this.table = data.table;
    }
  }
  ngOnInit(): void {
    this.teacherService.getTeachers().subscribe(value => {
      this.teachers = value
    })
  }

  addDay(): void{
    this.table.subject = this.addTableForm.controls['subject'].value;
    this.table.teacherId = this.addTableForm.controls['id'].value;
    const exist = this.table.timeTable.findIndex(ele => ele.day === this.addTableForm.controls['day'].value);
    if (exist > -1) {
      this.table.timeTable[exist].classes = {
        "1": this.addTableForm.controls['1'].value,
        "2": this.addTableForm.controls['2'].value,
        "3": this.addTableForm.controls['3'].value,
        "4": this.addTableForm.controls['4'].value,
        "5": this.addTableForm.controls['5'].value,
        "6": this.addTableForm.controls['6'].value,
      }
    } else {
      this.table.timeTable.push({
        day: this.addTableForm.controls['day'].value, classes: {
          "1": this.addTableForm.controls['1'].value,
          "2": this.addTableForm.controls['2'].value,
          "3": this.addTableForm.controls['3'].value,
          "4": this.addTableForm.controls['4'].value,
          "5": this.addTableForm.controls['5'].value,
          "6": this.addTableForm.controls['6'].value,
        }
      })
    }
    this.dataSource.data = this.table.timeTable;
    this.addTableForm.controls['1'].reset();
    this.addTableForm.controls['2'].reset()
    this.addTableForm.controls['3'].reset()
    this.addTableForm.controls['4'].reset()
    this.addTableForm.controls['5'].reset()
    this.addTableForm.controls['6'].reset()
    this.addTableForm.controls['day'].reset()
  }

  editeDay(data: any): void{
    this.addTableForm.controls['day'].setValue(data['day'])
    this.addTableForm.controls['1'].setValue(data['classes']["1"])
    this.addTableForm.controls['2'].setValue(data['classes']["2"])
    this.addTableForm.controls['3'].setValue(data['classes']["3"])
    this.addTableForm.controls['4'].setValue(data['classes']["4"])
    this.addTableForm.controls['5'].setValue(data['classes']["5"])
    this.addTableForm.controls['6'].setValue(data['classes']["6"])
  }
  save() {
    if(this.data.table === null){
      this.teacherTimeTable.addTable(this.table);
    }else{
      this.teacherTimeTable.updateTable(this.table);
    }
    this.dialogRef.close();
  }

  delete():void{
    const ref = this.dialog.open(DeleteDialog,{
        data: {message: 'You are attempting to delete this table are you sure that you want to delete it'}
    });

    ref.afterClosed().subscribe(res => {
      if(res === true){
        this.teacherTimeTable.deleteTable(this.table._id!);
        this.dialogRef.close();
      }
    })
  }
}
