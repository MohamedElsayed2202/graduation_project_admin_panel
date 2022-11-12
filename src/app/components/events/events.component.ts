import { DatePipe, formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventService } from 'src/app/services/event.service';
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
  constructor(public dialogRef: MatDialogRef<AddEventForm>, private eventService: EventService, @Inject(MAT_DIALOG_DATA) public data: {Events: Events}){
    if(data.Events === null){
      this.addeventForm = new FormGroup({
        title: new FormControl("", Validators.required),
        date :new FormControl("", Validators.required),
        description: new FormControl("", Validators.required),
        imageName: new FormControl("", Validators.required),
        image: new FormControl("",),
      })
    }else{
      this.addeventForm = new FormGroup({
        title: new FormControl(data.Events.title, Validators.required),
        date :new FormControl(data.Events.date, Validators.required),
        description: new FormControl(data.Events.description, Validators.required),
        imageName: new FormControl("", Validators.required),
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

  onSubmit():void{
    let formData: FormData = new FormData();
    formData.append('title', this.addeventForm.get('title')?.value);
    formData.append('date', new DatePipe('en-US').transform(this.addeventForm.get('date')?.value, 'shortDate')!);
    formData.append('description', this.addeventForm.get('description')?.value);
    formData.append('image', this.addeventForm.get('image')?.value);
    // console.log(this.addeventForm.get('title')?.value);
    // console.log(formData);
    // formData.forEach((v,k) => console.log(v, k))
    this.eventService.addEvent(formData);
  }

  onNoClick():void{
    this.dialogRef.close();
  }
  
  change(event:any){
    if(event.target.files.length>0){
      const file = event.target.files[0];
      console.log(file);
      
      this.addeventForm.patchValue({
        image: file
      });
      console.log(this.addeventForm.controls['image'].value);
      
    }
  }

  test(){
    console.log(this.addeventForm.controls['date'].value);
    console.log(new DatePipe('en-US').transform(this.addeventForm.controls['date'].value, 'shortDate'))
  }
}
