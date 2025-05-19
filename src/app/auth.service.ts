import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loginAsGuest(): void {
    // Beispiel: Gast-Token setzen
    //localStorage.setItem('token', 'e25e672152907ca5ece1f495e0ecaab5e34cdd2b');
    localStorage.setItem('token', 'a6116b533b2534ca8299582e030e7b35653daced');//	gast@predigtflix.de

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
