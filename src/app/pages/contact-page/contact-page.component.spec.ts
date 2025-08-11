import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactPageComponent } from './contact-page.component';

describe('ContactPageComponent', () => {
  let component: ContactPageComponent;
  let fixture: ComponentFixture<ContactPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactPageComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an invalid form', () => {
    expect(component.contactForm.valid).toBeFalsy();
    expect(component.isFormValid()).toBeFalsy();
  });

  it('should have required form controls', () => {
    expect(component.contactForm.contains('fullName')).toBeTruthy();
    expect(component.contactForm.contains('email')).toBeTruthy();
    expect(component.contactForm.contains('subject')).toBeTruthy();
    expect(component.contactForm.contains('message')).toBeTruthy();
  });

  it('should validate fullName field', () => {
    const fullNameControl = component.contactForm.get('fullName');

    // Test required validation
    fullNameControl?.setValue('');
    expect(fullNameControl?.errors?.['required']).toBeTruthy();

    // Test minLength validation
    fullNameControl?.setValue('ab');
    expect(fullNameControl?.errors?.['minlength']).toBeTruthy();

    // Test valid value
    fullNameControl?.setValue('John Doe');
    expect(fullNameControl?.errors).toBeNull();
  });

  it('should validate email field', () => {
    const emailControl = component.contactForm.get('email');

    // Test required validation
    emailControl?.setValue('');
    expect(emailControl?.errors?.['required']).toBeTruthy();

    // Test email validation
    emailControl?.setValue('invalid-email');
    expect(emailControl?.errors?.['email']).toBeTruthy();

    // Test valid email
    emailControl?.setValue('john@example.com');
    expect(emailControl?.errors).toBeNull();
  });

  it('should validate subject field', () => {
    const subjectControl = component.contactForm.get('subject');

    // Test required validation
    subjectControl?.setValue('');
    expect(subjectControl?.errors?.['required']).toBeTruthy();

    // Test valid value
    subjectControl?.setValue('Test Subject');
    expect(subjectControl?.errors).toBeNull();
  });

  it('should validate message field', () => {
    const messageControl = component.contactForm.get('message');

    // Test required validation
    messageControl?.setValue('');
    expect(messageControl?.errors?.['required']).toBeTruthy();

    // Test minLength validation
    messageControl?.setValue('Short');
    expect(messageControl?.errors?.['minlength']).toBeTruthy();

    // Test valid value
    messageControl?.setValue(
      'This is a valid message that meets the minimum length requirement.'
    );
    expect(messageControl?.errors).toBeNull();
  });

  it('should make form valid when all fields are filled correctly', () => {
    component.contactForm.patchValue({
      fullName: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message:
        'This is a valid message that meets the minimum length requirement.',
    });

    expect(component.contactForm.valid).toBeTruthy();
    expect(component.isFormValid()).toBeTruthy();
  });

  it('should show error messages for invalid fields', () => {
    const fullNameControl = component.contactForm.get('fullName');
    fullNameControl?.setValue('');
    fullNameControl?.markAsTouched();

    expect(component.hasError('fullName')).toBeTruthy();
    expect(component.getErrorMessage('fullName')).toBe('Full Name is required');
  });

  it('should handle form submission when valid', fakeAsync(() => {
    // Fill form with valid data
    component.contactForm.patchValue({
      fullName: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message:
        'This is a valid message that meets the minimum length requirement.',
    });

    // Submit form
    component.onSubmit();
    tick(1000); // Wait for simulated API call

    expect(component.showSuccessMessage).toBeTruthy();
    expect(component.isSubmitting).toBeFalsy();

    // Check if form is reset
    expect(component.contactForm.get('fullName')?.value).toBeNull();
    expect(component.contactForm.get('email')?.value).toBeNull();
    expect(component.contactForm.get('subject')?.value).toBeNull();
    expect(component.contactForm.get('message')?.value).toBeNull();
  }));

  it('should not submit form when invalid', () => {
    const initialValue = component.contactForm.get('fullName')?.value;

    component.onSubmit();

    expect(component.showSuccessMessage).toBeFalsy();
    expect(component.isSubmitting).toBeFalsy();
    expect(component.contactForm.get('fullName')?.value).toBe(initialValue);
  });

  it('should reset form correctly', () => {
    // Fill form
    component.contactForm.patchValue({
      fullName: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'Test message',
    });

    // Show success message
    component.showSuccessMessage = true;

    // Reset form
    component.resetForm();

    expect(component.contactForm.get('fullName')?.value).toBeNull();
    expect(component.contactForm.get('email')?.value).toBeNull();
    expect(component.contactForm.get('subject')?.value).toBeNull();
    expect(component.contactForm.get('message')?.value).toBeNull();
    expect(component.showSuccessMessage).toBeFalsy();
  });

  it('should get correct character count for message', () => {
    const testMessage = 'Test message';
    component.contactForm.get('message')?.setValue(testMessage);

    expect(component.getMessageCharCount()).toBe(testMessage.length);
  });

  it('should have contact information data', () => {
    expect(component.contactInfo.address).toBeDefined();
    expect(component.contactInfo.phone).toBeDefined();
    expect(component.contactInfo.email).toBeDefined();
    expect(component.contactInfo.businessHours).toBeDefined();
    expect(component.contactInfo.socialLinks).toBeDefined();
    expect(component.contactInfo.socialLinks.length).toBe(4);
  });

  it('should get correct field labels', () => {
    // This tests the private method indirectly through getErrorMessage
    component.contactForm.get('fullName')?.setValue('');
    component.contactForm.get('fullName')?.markAsTouched();

    expect(component.getErrorMessage('fullName')).toContain('Full Name');
  });
});
