import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastMessage {
  type: 'success' | 'error' | 'info';
  text: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private toastSubject = new Subject<ToastMessage>();
  toast$ = this.toastSubject.asObservable();

  show(message: ToastMessage) {
    this.toastSubject.next(message);
  }

  showError(text: string, duration = 3000) {
    this.show({ type: 'error', text, duration });
  }

  showSuccess(text: string, duration = 3000) {
    this.show({ type: 'success', text, duration });
  }


  constructor() { }

}
