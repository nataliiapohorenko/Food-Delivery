import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthComponent } from '../../shared/components/auth-form/auth-form.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RoutingConstants } from '../../constants/routes.constants';
import {
  nameValidator,
  emailValidator,
  minLengthValidator,
  uppercaseValidator,
  specialCharValidator,
} from '../../validators/auth-validation';
import { SignUpFormInterface } from '../../shared/models/auth-form.model';

@Component({
  selector: 'sign-up',
  template: `
    <auth-form
      [form]="signUpForm"
      action="Sign Up"
      (sendSignUpForm)="handleFormSubmit($event)" />
  `,
  imports: [AuthComponent],
})
export class SignUpComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  signUpForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, nameValidator]],
    email: ['', [Validators.required, emailValidator]],
    password: [
      '',
      [
        Validators.required,
        minLengthValidator,
        uppercaseValidator,
        specialCharValidator,
      ],
    ],
  });

  handleFormSubmit(formData: SignUpFormInterface): void {
    this.authService.signup(formData).subscribe({
      next: () => {
        this.router.navigate([RoutingConstants.HOME]);
      },
      error: err => {
        console.error('Registration failed:', err);
      },
    });
  }
}
