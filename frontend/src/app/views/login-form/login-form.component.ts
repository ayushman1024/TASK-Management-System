import { Component, OnInit } from '@angular/core';
import { Register } from '../../framework/models/register';
import { AuthLoginInfo } from 'src/app/framework/auth/login-info';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  error;
  user = 'mentor';
  toggleForm = true;
  loginModel = new AuthLoginInfo();
  registerModel = new Register();
  constructor() { }
  ngOnInit() {
  }

  login() {
    // service call
  }

  register() {
    // service call
  }
  userChange(event) {
    console.log(event);
    if (event.checked) {
      this.user = 'mentor';
  } else {
    this.user = 'trainee';
    }
  }
}
