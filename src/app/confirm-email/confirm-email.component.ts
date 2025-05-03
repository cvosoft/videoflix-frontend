import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./confirm-email.component.scss']  // <- Plural
})
export class ConfirmEmailComponent implements OnInit {

  status: string = 'Bestätige E-Mail...';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    const key = this.route.snapshot.paramMap.get('key');
    if (key) {
      this.http.post('http://127.0.0.1:8000/api/confirm-email/', { key })
        .subscribe({
          next: () => this.status = '✅ E-Mail wurde erfolgreich bestätigt!',
          error: () => this.status = '❌ Die Bestätigung ist fehlgeschlagen.'
        });
    } else {
      this.status = '❌ Kein Schlüssel in der URL gefunden.';
    }
  }
}
