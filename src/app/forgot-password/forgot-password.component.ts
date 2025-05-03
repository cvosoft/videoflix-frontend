import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  email: string = '';

  constructor(private router: Router, private http: HttpClient, private notificationService: NotificationService) { }


  onSubmit(form: any) {

    const payload = {
      email: this.email,
    };

    this.http.post('http://127.0.0.1:8000/api/password/reset', payload).subscribe({
      next: response => {
        //console.log("gesendet:", this.email);
        this.notificationService.showSuccess("Die E-Mail zum Zurücksetzen des Passwortes wurde verschickt");
        // auf Loginseite wechseln
        this.router.navigate(['/login']);
      }
    })
  }
}
