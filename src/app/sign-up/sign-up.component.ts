import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';
import { environment } from '../../../src/environments/environment';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private notificationService: NotificationService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  onSubmit(form: any) {
    if (form.valid) {
      if (this.password !== this.confirmPassword) {
        console.log('Passwörter stimmen nicht überein!');
        return;
      }

      const payload = {
        email: this.email,
        password: this.password,
      };

      //console.log('Formulardaten:', form.value);

      this.http.post(`${environment.apiUrl}/signup/`, payload).subscribe({
        next: response => {
          //console.log('Registrierung erfolgreich:', response);
          this.notificationService.showSuccess("Registrierung erfolgreich. Bitte Emails prüfen.");
          // auf Loginseite wechseln
          this.router.navigate(['/login']);

        },
        error: err => {
          //console.error('Fehler:', err.error);
          const errors = err.error;
          let message = 'Registrierung fehlgeschlagen';

          if (typeof errors === 'object') {
            // Alle Arrays von Fehlermeldungen zusammenführen
            const messages = Object.values(errors)
              .flat()                     // alle Arrays zusammenfassen
              .join('\n');                // in einzelne Zeilen trennen

            message = messages || message;
          }

          this.notificationService.showError(message);
        }
      });


    } else {
      console.log('Formular ist ungültig');
    }
  }

}
