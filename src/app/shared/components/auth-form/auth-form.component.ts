import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  inject,
  OnDestroy,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ValidationError } from '../../pipes/validation-error.pipe';
import { Router, RouterLink } from '@angular/router';
import { RoutingConstants } from '../../../constants/routes.constants';
import {
  LoginFormInterface,
  SignUpFormInterface,
} from '../../models/auth-form.model';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'auth-form',
  templateUrl: './auth-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ValidationError,
    RouterLink,
    MatProgressBarModule,
  ],
})
export class AuthComponent implements OnInit, OnDestroy {
  @Input() form!: FormGroup;
  @Input() action!: string;
  @Output() sendLoginForm = new EventEmitter<LoginFormInterface>();
  @Output() sendSignUpForm = new EventEmitter<SignUpFormInterface>();
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  private loaderService: LoaderService = inject(LoaderService);
  private subscriptions: Subscription = new Subscription();

  loading = this.loaderService.loading;
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

  async loginWithFacebook() {
    try {
      const fbToken = await this.authService.loginWithFacebook();

      const sub = this.authService
        .sendFacebookTokenToBackend(fbToken)
        .subscribe({
          next: () => this.router.navigate([RoutingConstants.HOME]),
          error: err => console.error('Backend login failed:', err),
        });
      this.subscriptions.add(sub);
    } catch (error) {
      console.error('Facebook login failed:', error);
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
          {
            theme: 'outline',
            width: '180',
            shape: 'pill',
          }
        );
      } else {
        console.error('Google API not loaded');
      }
    }, 500);
  }

  private handleGoogleLogin(googleToken: string): void {
    const sub = this.authService.loginWithGoogle(googleToken).subscribe({
      next: () => {
        this.router.navigate([RoutingConstants.HOME]);
        console.log('Google Login Successful');
      },
      error: err => console.error('Google Auth Error:', err),
    });
    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
