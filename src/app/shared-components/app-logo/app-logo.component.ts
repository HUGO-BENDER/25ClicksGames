import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-logo',
  templateUrl: './app-logo.component.html',
  styleUrls: ['./app-logo.component.scss'],
})
export class AppLogoComponent implements OnInit {
  inSmallScreen: boolean;

  constructor(public breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(min-width: 600px)'])
      .subscribe((state: BreakpointState) => {
        this.inSmallScreen = !state.matches;
      });
  }
}
