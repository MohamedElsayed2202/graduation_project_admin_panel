import { DatePipe, formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventService } from 'src/app/services/event.service';
import { Events } from './../../interfaces/events';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: Events[] = [];
  constructor(public dilaog: MatDialog, private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(value => {
      this.events = value;
    })
  }
  openDialog(): void {
    const dialogRef = this.dilaog.open(AddEventForm, {
      width: '400px',
      data: { Events: null }
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
  addeventForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<AddEventForm>, private eventService: EventService, @Inject(MAT_DIALOG_DATA) public data: { Events: Events }) {
    if (data.Events === null) {
      this.addeventForm = new FormGroup({
        title: new FormControl("", Validators.required),
        date: new FormControl("", Validators.required),
        description: new FormControl("", Validators.required),
        grade: new FormControl("", Validators.required),
        imageName: new FormControl("", Validators.required),
        location: new FormBuilder().group({
          name: new FormControl("", Validators.required),
          url: new FormControl("")
        }),
        image: new FormControl("",),
      })
    } else {
      this.addeventForm = new FormGroup({
        title: new FormControl(data.Events.title, Validators.required),
        date: new FormControl(data.Events.date, Validators.required),
        description: new FormControl(data.Events.description, Validators.required),
        grade: new FormControl(data.Events.grade, Validators.required),
        imageName: new FormControl("", Validators.required),
        location: new FormBuilder().group({
          name: new FormControl(data.Events.location.name, Validators.required),
          url: new FormControl(data.Events.location.url)
        }),
        image: new FormControl("")
      })
    }
  }
  get formControlles() {
    return this.addeventForm.controls;
  }
  getTitleErrorMessage() {
    return this.addeventForm.controls['title'].hasError('required') ? 'You must enter a value' : '';
  }
  getDateErrorMessage() {
    return this.addeventForm.controls['date'].hasError('required') ? 'You must select a date' : '';
  }
  getDescriptionErrorMessage() {
    return this.addeventForm.controls['description'].hasError('required') ? 'You must enter a value' : '';
  }
  getGradeErrorMessage() {
    return this.addeventForm.controls['grade'].hasError('required') ? 'You must select a grade' : '';
  }
  getimageErrorMessage() {
    return this.addeventForm.controls['image'].hasError('required') ? 'You must enter a value' : '';
  }
  getLocationErrorMessage() {
    return this.addeventForm.controls['location'].get('name')?.hasError('required') ? 'You must enter location name' : '';
  }

  onSubmit(): void {
    let formData: FormData = new FormData();
      formData.append('title', this.addeventForm.get('title')?.value);
      formData.append('date', this.addeventForm.get('date')?.value);
      formData.append('description', this.addeventForm.get('description')?.value);
      formData.append('location', JSON.stringify(this.addeventForm.get('location')?.value));
      formData.append('grade', this.addeventForm.get('grade')?.value);
      
    if (this.data.Events === null) {
      formData.append('image', this.addeventForm.get('image')?.value);
      this.eventService.addEvent(formData);
    }else{
      if(this.addeventForm.get('image')?.value !== '' && this.addeventForm.get('image')?.value !== null){
        formData.append('image', this.addeventForm.get('image')?.value);
      }else{
        formData.append('imageUrl', this.data.Events.image!);
      }
      this.eventService.updateEvent(this.data.Events._id!, formData);
    }
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  change(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addeventForm.patchValue({
        image: file
      });
    }
  }

}
