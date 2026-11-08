import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

interface RegistrationSummary {
  name: string;
  email: string;
}

@Component({
  selector: 'app-course-registration-reactive',
  standalone: false,
  templateUrl: './course-registration-reactive-component.html',
})
export class CourseRegistrationReactiveComponent {
  readonly regForm = new FormGroup(
    {
      name: new FormControl('Trần Duy Thanh', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(3), this.customNameValidator],
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      confirmPass: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    },
    { validators: this.passwordMatchValidator },
  );

  submittedData: RegistrationSummary | null = null;

  setDefaultValues(): void {
    this.regForm.patchValue({
      name: 'Trần Duy Thanh',
      email: 'test@gmail.com',
    });
  }

  onSubmit(): void {
    if (this.regForm.invalid) {
      this.regForm.markAllAsTouched();
      return;
    }

    const { name, email } = this.regForm.getRawValue();
    this.submittedData = { name, email };
  }

  private customNameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (typeof value !== 'string') {
      return null;
    }

    return /[@?#$%^&]/.test(value) ? { nameNotMatch: { value } } : null;
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPass = control.get('confirmPass')?.value;

    return password === confirmPass ? null : { mismatch: true };
  }
}
