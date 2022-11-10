import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { EventsComponent } from './components/events/events.component';
import { GradeComponent } from './components/grade/grade.component';
import { LoginComponent } from './components/login/login.component';
import { StudentsComponent } from './components/students/students.component';
import { TeacherComponent } from './components/teacher/teacher.component';

const routes: Routes = [
  {path: '' ,component: DashbordComponent, children: [
    {path: 'students', component: StudentsComponent},
    {path: "events",component:EventsComponent}
    {path: 'teachers', component: TeacherComponent},
    {path: 'grades', component: GradeComponent}
  ]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
