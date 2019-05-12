import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

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

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
  }

  logout() {
    window.sessionStorage.clear();
  }
}
