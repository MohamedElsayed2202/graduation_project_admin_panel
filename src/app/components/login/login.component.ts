import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  adminLoginForm: FormGroup;
  hide = true;
  constructor(private userService: UserService) {
    
    this.adminLoginForm = new FormGroup({
      email: new FormControl("",[Validators.required, Validators.email]),
      password: new FormControl("", Validators.required)
    })
   }

  ngOnInit(): void {
  }

  get formControlles(){
    return this.adminLoginForm.controls;
  }

  getEmailErrorMessage() {
    if (this.adminLoginForm.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }
    return this.adminLoginForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.adminLoginForm.controls['password'].hasError('required')) {
      return 'You must enter a value';
    }
    return ''
  }

  onSubmit():void{
    const user = {
      email: this.adminLoginForm.controls['email'].value,
      password: this.adminLoginForm.controls['password'].value,
    };
    this.userService.login(user);
  }
}
