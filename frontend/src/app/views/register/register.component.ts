import { Component, OnInit } from '@angular/core';
import { SignUpInfo } from 'src/app/framework/auth/signup-info';
import { AuthService } from 'src/app/framework/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(private authService: AuthService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() { }

  onSubmit() {
    this.signupInfo.user = 'U';
    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.router.navigate(['./login']);
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
