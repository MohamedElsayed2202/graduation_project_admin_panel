import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashbordComponent } from './components/dashbord/dashbord.component';

import { EventsComponent } from './components/events/events.component';
import { GradeComponent } from './components/grade/grade.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StudentsComponent } from './components/students/students.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { TimatableComponent } from './components/timatable/timatable.component';

const routes: Routes = [
  {path: '', redirectTo: '/students', pathMatch: 'full'},
  {path: '' ,component: DashbordComponent, children: [
    {path: 'students', component: StudentsComponent},
    {path: "events",component:EventsComponent},
    {path: 'teachers', component: TeacherComponent},
    {path: 'grades', component: GradeComponent},
    {path: 'profile', component: ProfileComponent},
    {path:'tables', component:TimatableComponent}
  ],canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
