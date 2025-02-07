import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthComponent } from '../../shared/components/auth-form/auth-form.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RoutingConstants } from '../../constants/routes.constants';
import { emailValidator } from '../../validators/auth-validation';
import { LoginFormInterface } from '../../shared/models/auth-form.model';

@Component({
  selector: 'login',
  template: `
    <auth-form
      [form]="loginForm"
      action="Login"
      (sendLoginForm)="handleFormSubmit($event)" />
  `,
  imports: [AuthComponent],
})
export class LoginComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, emailValidator]],
    password: ['', [Validators.required]],
  });

  handleFormSubmit(formData: LoginFormInterface): void {
    this.authService.login(formData).subscribe({
      next: () => {
        this.router.navigate([RoutingConstants.HOME]);
      },
      error: err => {
        console.error('Login failed:', err);
      },
    });
  }
}
