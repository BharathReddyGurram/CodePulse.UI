import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  private returnUrl: string = 'home';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    const r = this.route.snapshot.queryParamMap.get('returnUrl');
    if (r) this.returnUrl = r;
  }
  hasError(controlName: string, errorName: string) {
    const control = this.loginForm.get(controlName);
    return control?.touched && control?.hasError(errorName);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.isLoading = false;

        const role = this.authService.getRole();
debugger;
        // Simple redirect logic by role
        if (role === 'SuperAdmin') {
          this.router.navigate(['admin/dashboard']);
        } else if (role === 'Manager') {
          this.router.navigate(['admin/dashboard']);
        } else {
          this.router.navigate([this.returnUrl]);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Invalid email or password';
      }
    });
  }
}
