import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
signupForm: FormGroup;
  isLoading = false;
  isSuccess = false;
errorMessage = '';

constructor(
  private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
){
  this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
}

passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }

  hasError(controlName: string, errorName: string) {
    const control = this.signupForm.get(controlName);
    return control?.touched && control?.hasError(errorName);
  }

  onSubmit() {
  if (this.signupForm.valid) {
    this.isLoading = true;
    this.errorMessage = '';
    this.isSuccess = false;

    const userData = this.signupForm.value;

    this.authService.register(userData).subscribe({
      next: () => {
        this.isLoading = false;
        this.isSuccess = true;

        // Optionally navigate after a short delay
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Registration failed';
      }
    });
  }

  }

}
