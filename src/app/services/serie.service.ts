import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Serie } from '../models/models';  // ← dein Interface importieren
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SerieService {
  private apiUrl = `${environment.apiUrl}api/serien/`;  // oder dein tatsächlicher API-Endpunkt

  constructor(private http: HttpClient) { }

  getSerien(): Observable<Serie[]> {
    return this.http.get<Serie[]>(this.apiUrl);
  }
}