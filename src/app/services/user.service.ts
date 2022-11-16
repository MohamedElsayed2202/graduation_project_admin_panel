import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headerOptions;
  user: BehaviorSubject<any>;
  constructor(private httpClient: HttpClient, private router:Router) { 
    this.headerOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    };
    this.user = new BehaviorSubject<any>({});
  }

  login(user: any): void{
    this.httpClient.post<any>(environment.AdminApi, JSON.stringify(user), this.headerOptions)
    .subscribe(value => {
      if(value.id){
        localStorage.setItem('id', value.id);
        this.router.navigateByUrl("");
      }
    })
  }

  getUser(id: string): BehaviorSubject<any>{
    this.httpClient.get<any>(`${environment.AdminApi}?id=${id}`).subscribe(value => {
      this.user.next(value);
    })
    return this.user;
  }

  updateUser(user: any): void{
    this.httpClient.put<any>(`${environment.AdminApi}/${user._id}`, JSON.stringify(user), this.headerOptions)
    .subscribe(value => {
      this.user.next(value);
    })
  }

  logout(): void{
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }
}
