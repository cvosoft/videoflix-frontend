import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../src/environments/environment';


@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./confirm-email.component.scss']  // <- Plural
})
export class ConfirmEmailComponent implements OnInit {

  status: string = 'Bestätige E-Mail...';
  code: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }



  //  GET /api/signup/verify/?code=1ef140d014bbd8845b1fdb7f2fd09f309673992a



  ngOnInit() {
    //const key = this.route.snapshot.paramMap.get('key');
    this.code = this.route.snapshot.queryParamMap.get('code') || '';  // "code" aus URL holen
    if (this.code) {
      this.http.get(`${environment.apiUrl}/signup/verify/`, { params: { code: this.code } })
        .subscribe({
          next: () => this.status = '✅ E-Mail wurde erfolgreich bestätigt!',
          error: () => this.status = '❌ Die Bestätigung ist fehlgeschlagen.'
        });
    } else {
      this.status = '❌ Kein Schlüssel in der URL gefunden.';
    }
  }
}
