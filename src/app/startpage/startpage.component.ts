import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-startpage',
  imports: [FormsModule],
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

