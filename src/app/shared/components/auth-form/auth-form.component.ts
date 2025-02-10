import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  inject,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationError } from '../../pipes/validation-error.pipe';
import { Router, RouterLink } from '@angular/router';
import { RoutingConstants } from '../../../constants/routes.constants';
import {
  LoginFormInterface,
  SignUpFormInterface,
} from '../../models/auth-form.model';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'auth-form',
  templateUrl: './auth-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValidationError, RouterLink],
})
export class AuthComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() action!: string;
  @Output() sendLoginForm = new EventEmitter<LoginFormInterface>();
  @Output() sendSignUpForm = new EventEmitter<SignUpFormInterface>();
  private router: Router = inject(Router);
  private authService = inject(AuthService);

  RoutingConstants = RoutingConstants;

  isSubmitted = false;

  ngOnInit(): void {
    this.initializeGoogleLogIn();
  }

  onSubmit(event: Event): void {
    this.isSubmitted = true;
    event.preventDefault();
    if (this.form.invalid) return;
    if (this.form.contains('name')) {
      this.sendSignUpForm.emit(this.form.value as SignUpFormInterface);
    } else {
      this.sendLoginForm.emit(this.form.value as LoginFormInterface);
    }
  }

  private initializeGoogleLogIn(): void {
    setTimeout(() => {
      if (window.google?.accounts) {
        window.google.accounts.id.initialize({
          client_id: environment.googleClientId,
          callback: (response: { credential: string }) =>
            this.handleGoogleLogin(response.credential),
        });
        window.google.accounts.id.renderButton(
          document.getElementById('googleSignInButton'),
          { theme: 'outline', size: 'large' }
        );
      } else {
        console.error('Google API not loaded');
      }
    }, 500);
  }

  private handleGoogleLogin(googleToken: string): void {
    this.authService.loginWithGoogle(googleToken).subscribe({
      next: () => {
        this.router.navigate([RoutingConstants.HOME]);
        console.log('Google Login Successful');
      },
      error: err => console.error('Google Auth Error:', err),
    });
  }
}
