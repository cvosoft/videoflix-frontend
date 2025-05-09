import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../services/notification.service';
import { environment } from '../../../src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-log-in',
  imports: [RouterModule, FormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {

  constructor(public authService: AuthService, private router: Router, private http: HttpClient, private notificationService: NotificationService) { }

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
        next: (response: any) => {
          // token extrakt
          const token = response.token;

          if (token) {
            localStorage.setItem('token', token);

            // auf Videoseite wechseln
            this.router.navigate(['/videos']);
          }

        },
        error: err => {
          //console.error('Fehler:', err.error);
          const errors = err.error;
          let message = 'Login fehlgeschlagen';

          if (err.status >= 500) {
            message = 'Serverfehler. Bitte versuchen Sie es später erneut.';
          }

          this.notificationService.showError(message);
        }
      });


    } else { // form invalid
      console.log('Fehler');
    }
  }

  guestLogin() {
    this.authService.loginAsGuest();
    this.router.navigate(['/videos']);
  }

}


