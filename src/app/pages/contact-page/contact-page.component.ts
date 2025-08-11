import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css',
})
export class ContactPageComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;
  showSuccessMessage = false;

  // Contact information
  contactInfo = {
    address: 'Avenue Mohammed V, Rabat 10000, Morocco',
    phone: '+212 5 37 70 00 00',
    email: 'contact@bam.ma',
    businessHours: 'Monday - Friday: 8:30 AM - 4:30 PM',
    socialLinks: [
      { icon: 'fa-facebook', url: '#', label: 'Facebook' },
      { icon: 'fa-twitter', url: '#', label: 'Twitter' },
      { icon: 'fa-linkedin', url: '#', label: 'LinkedIn' },
      { icon: 'fa-instagram', url: '#', label: 'Instagram' },
    ],
  };

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(1000),
        ],
      ],
    });
  }

  ngOnInit(): void {
    // Form is ready
  }

  // Getter methods for easy access to form controls
  get fullName() {
    return this.contactForm.get('fullName');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get subject() {
    return this.contactForm.get('subject');
  }
  get message() {
    return this.contactForm.get('message');
  }

  // Check if field has error
  hasError(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // Get error message for field
  getErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) {
      return `${this.getFieldLabel(fieldName)} is required`;
    }
    if (field.errors['email']) {
      return 'Please enter a valid email address';
    }
    if (field.errors['minlength']) {
      const minLength = field.errors['minlength'].requiredLength;
      return `${this.getFieldLabel(
        fieldName
      )} must be at least ${minLength} characters`;
    }
    if (field.errors['maxlength']) {
      const maxLength = field.errors['maxlength'].requiredLength;
      return `${this.getFieldLabel(
        fieldName
      )} must not exceed ${maxLength} characters`;
    }

    return '';
  }

  // Get human-readable field label
  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      fullName: 'Full Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
    };
    return labels[fieldName] || fieldName;
  }

  // Handle form submission
  async onSubmit(): Promise<void> {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      try {
        // Simulate API call
        await this.sendMessage();

        // Show success message
        this.showSuccessMessage = true;

        // Reset form
        this.contactForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 5000);
      } catch (error) {
        console.error('Error sending message:', error);
        // In a real app, you'd show an error message here
      } finally {
        this.isSubmitting = false;
      }
    } else {
      // Mark all fields as touched to trigger validation display
      Object.keys(this.contactForm.controls).forEach((key) => {
        const control = this.contactForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  // Simulate sending message to backend
  private sendMessage(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Message sent successfully:', this.contactForm.value);
        resolve();
      }, 1000); // Simulate 1 second delay
    });
  }

  // Reset form
  resetForm(): void {
    this.contactForm.reset();
    this.showSuccessMessage = false;
  }

  // Get character count for message
  getMessageCharCount(): number {
    return this.message?.value?.length || 0;
  }

  // Check if form is valid
  isFormValid(): boolean {
    return this.contactForm.valid && !this.isSubmitting;
  }
}
