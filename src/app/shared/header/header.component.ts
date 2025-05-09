import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service'


@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  constructor(public router: Router, public authService: AuthService) { }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  isVideOfferPage(): boolean {
    return this.router.url === '/videos';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
