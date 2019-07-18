import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/framework/services/global.service';

@Component({
  selector: 'app-tdashboard',
  templateUrl: './tdashboard.component.html',
  styleUrls: ['./tdashboard.component.css']
})
export class TdashboardComponent implements OnInit {

  data = { prgmName: this.global.getProgramName()};
  page = 'ALL TASKS';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private global: GlobalService, private router: Router, private route: ActivatedRoute,
              private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    if (! this.global.getLogged()) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
    this.global.setLogged(false);
  }

}
