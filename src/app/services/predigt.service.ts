import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Predigt } from '../models/models';  // ← dein Interface importieren

@Injectable({
  providedIn: 'root',
})
export class PredigtService {
  private apiUrl = 'http://localhost:8000/api/predigten/';  // oder dein tatsächlicher API-Endpunkt

  constructor(private http: HttpClient) { }

  getPredigtById(id: number): Observable<Predigt> {
    return this.http.get<Predigt>(`${this.apiUrl}${id}/`);
  }
}