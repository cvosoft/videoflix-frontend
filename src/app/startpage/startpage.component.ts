import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-startpage',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './startpage.component.html',
  styleUrl: './startpage.component.scss'
})
export class StartpageComponent {
  email: string = '';

  constructor(private router: Router) { }

  onSubmit() {
    if (this.email) {
      this.router.navigate(['/register'], { queryParams: { email: this.email } });
    }
  }
}

