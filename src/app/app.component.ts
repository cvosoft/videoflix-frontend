import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/footer/footer.component";
import { HeaderComponent } from "./shared/header/header.component";
import { ToastComponent } from "./shared/toast/toast.component";
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, HeaderComponent, CommonModule, ToastComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'videoflix';
  backgroundClass = "";

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;
        if (url === '/') {
          this.backgroundClass = 'startpage-bg';
        } else if (url.startsWith('/legalnotice')) {
          this.backgroundClass = 'legalnotice-bg';
        } else if (url.startsWith('/imprint')) {
          this.backgroundClass = 'imprint-bg';
        } else if (url.startsWith('/login')) {
          this.backgroundClass = 'login-bg';
        } else if (url.startsWith('/register')) {
          this.backgroundClass = 'register-bg';
        } else if (url.startsWith('/forgot-pw')) {
          this.backgroundClass = 'forgotpw-bg';          
        } else {
          this.backgroundClass = 'startpage-bg';
        }
      });

  }

}
