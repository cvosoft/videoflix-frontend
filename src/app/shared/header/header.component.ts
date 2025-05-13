import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service'
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  constructor(private location: Location, public router: Router, public authService: AuthService) { }

  goBack(): void {
    this.location.back();
  }

  isPredigtDetailPage(): boolean {
    return this.router.url.startsWith('/predigt/');
  }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  isVideOfferPage(): boolean {
    return this.router.url === '/videos';
  }

  isImprintOrLegalNotice(): boolean {
    return this.router.url === '/imprint' || this.router.url === '/legalnotice';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
