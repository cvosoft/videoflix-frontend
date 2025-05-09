import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loginAsGuest(): void {
    // Beispiel: Gast-Token setzen
    localStorage.setItem('token', 'e25e672152907ca5ece1f495e0ecaab5e34cdd2b');
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
