import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/framework/models/login';
import { Register } from '../../framework/models/register';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  error;
  user = 'mentor';
  toggleForm = true;
  loginModel = new Login();
  registerModel = new Register();
  constructor() { }
  ngOnInit() {
  }

  login() {
    this.loginModel.user = this.user;
    // service call
  }

  register() {
    this.loginModel.user = this.user;
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
