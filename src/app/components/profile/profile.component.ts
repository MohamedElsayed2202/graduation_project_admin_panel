import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  edite: boolean;
  hide: boolean;
  userForm: FormGroup;
  user: any;
  constructor(private userService: UserService) {
    this.edite = false;
    this.hide = true;
    this.userForm = new FormGroup({
      // test: new FormControl({value: '', disabled: true})
      name: new FormControl({ value: '', disabled: true }, Validators.required),
      email: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]),
      password: new FormControl({ value: '', disabled: true }, Validators.required)
    })
  }

  ngOnInit(): void {
    this.userService.getUser(localStorage.getItem('id')!).subscribe(value => {
      this.user = value;
      this.userForm.controls['name'].setValue(value.name);
      this.userForm.controls['email'].setValue(value.email);
      this.userForm.controls['password'].setValue(value.password);
    })
  }

  enable() {
    this.edite = true;
    this.userForm.controls['name'].enable();
    this.userForm.controls['email'].enable();
    this.userForm.controls['password'].enable();
  }
  cancle() {
    this.edite = false;
    this.userForm.controls['name'].disable()
    this.userForm.controls['email'].disable()
    this.userForm.controls['password'].disable()
    this.userForm.controls['name'].setValue(this.user.name);
    this.userForm.controls['email'].setValue(this.user.email);
    this.userForm.controls['password'].setValue(this.user.password);
  }

  onSubmit() {
    const user = {
      _id: this.user._id,
      name: this.userForm.controls['name'].value,
      email: this.userForm.controls['email'].value,
      password: this.userForm.controls['password'].value
    }
    this.userService.updateUser(user);
    this.edite = false;
    this.userForm.controls['name'].disable()
    this.userForm.controls['email'].disable()
    this.userForm.controls['password'].disable()
  }

  get formControlles() {
    return this.userForm.controls;
  }
  getNameErrorMessage() {
    return this.userForm.controls['name'].hasError('required') ? 'You must enter a value' : '';
  }

  getEmailErrorMessage() {
    if (this.userForm.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }
    return this.userForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    return this.userForm.controls['password'].hasError('required') ? 'You must enter a value' : '';

  }
}
