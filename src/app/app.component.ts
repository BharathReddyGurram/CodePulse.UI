import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './Features/Auth/services/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showNavbar = false;
  title = 'codepulse';

  constructor(private router: Router, private auth: AuthService)
  {
    // this.router.events
    //   .pipe(filter(e => e instanceof NavigationEnd))
    //   .subscribe(() => {
    //     const loggedIn = this.auth.isLoggedIn();
    //     this.showNavbar = loggedIn;
    //   });

      this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        const url = e.urlAfterRedirects || e.url;
        this.showNavbar = !(
          url.startsWith('/login') ||
          url.startsWith('/signup') ||
          url.startsWith('/register')
        );
      });
  }
}
