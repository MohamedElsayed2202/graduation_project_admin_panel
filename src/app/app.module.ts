import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MaterialExampleModule} from '../material.module';
import {MatNativeDateModule} from'@angular/material/core'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashbordComponent,DeleteDialog } from './components/dashbord/dashbord.component';
import { StudentsComponent, AddStudentForm } from './components/students/students.component';

import { EventsComponent,AddEventForm } from './components/events/events.component';
import { CardEventComponent } from './components/card-event/card-event.component';
import { TeacherComponent,AddTeacherForm } from './components/teacher/teacher.component';
import { GradeComponent } from './components/grade/grade.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TimatableComponent, AddClassTableForm, AddTeacherTableForm } from './components/timatable/timatable.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashbordComponent,
    DeleteDialog,
    StudentsComponent,
    AddStudentForm,
    EventsComponent,
    AddEventForm,
    CardEventComponent,
    TeacherComponent,
    AddTeacherForm,
    GradeComponent,
    ProfileComponent,
    TimatableComponent,
    AddClassTableForm,
    AddTeacherTableForm
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
