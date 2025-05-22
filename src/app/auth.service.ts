import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loginAsGuest(): void {
    // Beispiel: Gast-Token setzen
    localStorage.setItem('token', environment.guestToken);
  }

  isAuthenticated(): boolean {
    // Prüft nur, ob ein Token gesetzt ist
    // ob es der richtige token ist, prüft das backend
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
