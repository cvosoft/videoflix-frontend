import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loginAsGuest(): void {
    // Beispiel: Gast-Token setzen
    //localStorage.setItem('token', 'e25e672152907ca5ece1f495e0ecaab5e34cdd2b');
    localStorage.setItem('token', 'b0fd9b64407f3ca744975e6b8991e6aed7fb06f9');//	gast@predigtflix.de
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
