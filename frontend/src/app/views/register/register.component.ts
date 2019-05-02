import { Component, OnInit } from '@angular/core';
import { SignUpInfo } from 'src/app/framework/auth/signup-info';
import { AuthService } from 'src/app/framework/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo = new SignUpInfo();
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit() { }

  onSubmit() {
    if (this.signupInfo.user === 'M') {
      this.signupInfo.role = ['user', 'admin'];
    } else if (this.signupInfo.user === 'T') {
      this.signupInfo.role = ['user'];
    }

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
