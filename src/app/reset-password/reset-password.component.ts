import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../src/environments/environment';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  password: string = '';
  confirmPassword: string = '';
  code: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private notificationService: NotificationService, private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.code = this.route.snapshot.queryParamMap.get('code') || '';  // "code" aus URL holen

  }

  onSubmit(form: any) {

    const payload = {
      code: this.code,
      password: this.password,
    };


    this.http.post(`${environment.apiUrl}api/password/reset/verified/`, payload)
      .subscribe({
        next: (res) => {
          //this.successMessage = 'Passwort erfolgreich zurückgesetzt. Du wirst weitergeleitet...';
          this.notificationService.showSuccess('Passwort erfolgreich zurückgesetzt. Du wirst weitergeleitet...');
          setTimeout(() => this.router.navigate(['/login']), 3000);
        },
        error: (err) => {
          this.notificationService.showError('Fehler beim Zurücksetzen des Passworts. Bitte versuche es erneut.');
          console.error("Fehler:", err.error);
        }
      });


  }
}
