import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Events } from './../../interfaces/events';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  constructor(public dilaog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog(): void{
    const dialogRef = this.dilaog.open(AddEventForm,{
      width:'400px',
      data: {Events: null}
    });
  }
}


/////////////////////////////

@Component({
  selector: 'add-event-form',
  templateUrl: './add-event.html',
  styleUrls: ['./events.component.scss']
})

export class AddEventForm {
  addeventForm: FormGroup ;
  constructor(public dialogRef: MatDialogRef<AddEventForm>, @Inject(MAT_DIALOG_DATA) public data: {Events: Events}){
    if(data.Events === null){
      this.addeventForm = new FormGroup({
        title: new FormControl("", Validators.required),
        date :new FormControl("", Validators.required),
        description: new FormControl("", Validators.required),
        image: new FormControl("", Validators.required),
      })
    }else{
      this.addeventForm = new FormGroup({
        title: new FormControl(data.Events.title, Validators.required),
        date :new FormControl(data.Events.date, Validators.required),
        description: new FormControl(data.Events.description, Validators.required),
        image :new FormControl(data.Events.image, Validators.required)
      })
    }
  }
  get formControlles(){
    return this.addeventForm.controls;
  }
  getTitleErrorMessage(){
    return this.addeventForm.controls['title'].hasError('required')? 'You must enter a value' : '';
  }
  getDateErrorMessage(){
    return this.addeventForm.controls['date'].hasError('required')? 'You must select a date' : '';
  }
  getDescriptionErrorMessage(){
    return this.addeventForm.controls['description'].hasError('required')? 'You must enter a value' : '';
  }
  getimageErrorMessage(){
    return this.addeventForm.controls['image'].hasError('required')? 'You must enter a value' : '';
  }
  onSubmit():void{}
  onNoClick():void{
    this.dialogRef.close();
  }
  
}
