import { GlobalService } from 'src/app/framework/services/global.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthLoginInfo } from 'src/app/framework/auth/login-info';
import { AuthService } from 'src/app/framework/auth/auth.service';
import { TokenStorageService } from 'src/app/framework/auth/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [MessageService],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit , AfterViewInit{
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;

  constructor(private msg: MessageService, private authService: AuthService, private tokenStorage: TokenStorageService,
              private router: Router, private route: ActivatedRoute, private global: GlobalService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
      this.router.navigate(['./u/prg']);
    }
  }

  ngAfterViewInit() {
    this.msg.add({severity: 'success', summary: 'Service Message', detail: 'Via MessageService'});
  }

  onSubmit() {
    this.loginInfo = new AuthLoginInfo();
    this.loginInfo.username = this.form.username;
    this.loginInfo.password = this.form.password;
    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);
        this.global.setUid(data.uid);
        this.global.setCurrentProgramId(data.pid);
        this.global.setLogged(true);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        this.router.navigate(['./u/prg']);
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }
}
