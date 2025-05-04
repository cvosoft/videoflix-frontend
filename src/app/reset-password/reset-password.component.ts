import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  password: string = '';
  confirmPassword: string = '';
  uid: string = '';
  token: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid') || '';
    this.token = this.route.snapshot.paramMap.get('token') || '';
    console.log('UID:', this.uid);
    console.log('Token:', this.token);
  }

  onSubmit(form: any) {

    const payload = {
      uid: this.uid,
      token: this.token,
      new_password1: this.password,
      new_password2: this.confirmPassword
    };

    console.log('UID:', this.uid);
    console.log('Token:', this.token);
    console.log('Payload:', payload);

    //MeinNeuesicehres123

    this.http.post('http://127.0.0.1:8000/api/password/reset/confirm/', payload)
      .subscribe({
        next: (res) => {
          this.successMessage = 'Passwort erfolgreich zurückgesetzt. Du wirst weitergeleitet...';
          setTimeout(() => this.router.navigate(['/login']), 3000);
        },
        error: (err) => {
          this.errorMessage = 'Fehler beim Zurücksetzen des Passworts. Bitte versuche es erneut.';
          console.error("Fehler:", err.error);
        }
      });


  }
}
