import { Component } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //#region Variables
  isLoading = true;
  currentUrl = '/home';
  //#endregion

  //#region Constructor
  constructor(private router: Router) {
    this.subscribeToRouterEventsAndKeepCurrentUrl();
  }
  //#endregion

  //#region Routes
  subscribeToRouterEventsAndKeepCurrentUrl(): void {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.isLoading = true;
          break;
        }
        case event instanceof NavigationEnd: {
          const e = <NavigationEnd>event;
          if (e.url) {
            if (e.url.lastIndexOf('/') > 0) {
              this.currentUrl = e.url
                .substring(0, e.url.lastIndexOf('/'))
                .trim();
            } else {
              this.currentUrl = e.url.trim();
            }
            console.log('this.currentUrl = [', this.currentUrl, ']');
          }
          this.isLoading = false;
          break;
        }
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.isLoading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }
  //#endregion
  //#region Funciones
  checkIfShowHeaderAndFooter(): boolean {
    return !this.currentUrl.startsWith('/games');
  }

  //#endregion
}
