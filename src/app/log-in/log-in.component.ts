import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../services/notification.service';
import { environment } from '../../../src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-log-in',
  imports: [RouterModule, FormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {

  constructor(private router: Router, private http: HttpClient, private notificationService: NotificationService) { }

  email: string = '';
  password: string = '';


  onSubmit(form: any) {
    if (form.valid) {

      const payload = {
        email: this.email,
        password: this.password,
      };

      //console.log('Formulardaten:', form.value);

      this.http.post(`${environment.apiUrl}/login/`, payload).subscribe({
        next: response => {
          //console.log('Login erfolgreich:', response);
          // auf Videoseite wechseln
          this.router.navigate(['/videos']);

        },
        error: err => {
          //console.error('Fehler:', err.error);
          const errors = err.error;
          let message = 'Login fehlgeschlagen';

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


    } else { // form invalid
      console.log('Fehler');
    }
  }

  guestLogin() {
    this.router.navigate(['/videos']);
  }

}


