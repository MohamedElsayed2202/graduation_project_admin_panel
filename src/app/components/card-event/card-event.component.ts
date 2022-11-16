import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Events } from 'src/app/interfaces/events';
import { EventService } from 'src/app/services/event.service';
import { DeleteDialog } from '../dashbord/dashbord.component';
import { AddEventForm } from '../events/events.component';

@Component({
  selector: 'app-card-event',
  templateUrl: './card-event.component.html',
  styleUrls: ['./card-event.component.scss']
})
export class CardEventComponent implements OnInit {
  @Input() item:Events = {} as Events;
  constructor(public dilaog: MatDialog, private eventService: EventService) { }

  ngOnInit(): void {
  }

  openDialog(): void{
    const dialogRef = this.dilaog.open(AddEventForm,{
      width: '400px',
      data: {Events: this.item}
    })
  }

  delete():void{
    const ref = this.dilaog.open(DeleteDialog, {
      data: { message: 'You are attempting to delete this event are you sure that you want to delete it' }
    });

    ref.afterClosed().subscribe(res => {
      if (res === true) {
        this.eventService.delete(this.item._id!);
      }
    })
    
  }
}
