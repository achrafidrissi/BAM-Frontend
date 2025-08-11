import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<ToastMessage[]>([]);
  public toasts$: Observable<ToastMessage[]> =
    this.toastsSubject.asObservable();

  constructor() {}

  // Show success toast
  showSuccess(message: string, duration: number = 3000): void {
    this.showToast(message, 'success', duration);
  }

  // Show error toast
  showError(message: string, duration: number = 5000): void {
    this.showToast(message, 'error', duration);
  }

  // Show info toast
  showInfo(message: string, duration: number = 3000): void {
    this.showToast(message, 'info', duration);
  }

  // Show toast with custom type
  private showToast(
    message: string,
    type: 'success' | 'error' | 'info',
    duration: number
  ): void {
    const toast: ToastMessage = {
      id: this.generateId(),
      message,
      type,
      duration,
    };

    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next([...currentToasts, toast]);

    // Auto-remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        this.removeToast(toast.id);
      }, duration);
    }
  }

  // Remove specific toast
  removeToast(id: string): void {
    const currentToasts = this.toastsSubject.value;
    const filteredToasts = currentToasts.filter((toast) => toast.id !== id);
    this.toastsSubject.next(filteredToasts);
  }

  // Clear all toasts
  clearAllToasts(): void {
    this.toastsSubject.next([]);
  }

  // Generate unique ID for toast
  private generateId(): string {
    return (
      'toast_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    );
  }
}
