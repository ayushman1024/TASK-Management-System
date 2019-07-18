import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { GlobalService } from 'src/app/framework/services/global.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-udashboard',
  templateUrl: './udashboard.component.html',
  styleUrls: ['./udashboard.component.css']
})
export class UdashboardComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private global: GlobalService, private router: Router, private route: ActivatedRoute,
              private breakpointObserver: BreakpointObserver) { }

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
