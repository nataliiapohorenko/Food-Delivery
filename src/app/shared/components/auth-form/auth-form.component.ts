import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationError } from '../../pipes/validation-error.pipe';
import { RouterLink } from '@angular/router';
import { RoutingConstants } from '../../../constants/routes.constants';
import {
  LoginFormInterface,
  SignUpFormInterface,
} from '../../models/auth-form.model';

@Component({
  selector: 'auth-form',
  templateUrl: './auth-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValidationError, RouterLink],
})
export class AuthComponent {
  @Input() form!: FormGroup;
  @Input() action!: string;
  @Output() sendLoginForm = new EventEmitter<LoginFormInterface>();
  @Output() sendSignUpForm = new EventEmitter<SignUpFormInterface>();

  RoutingConstants = RoutingConstants;

  isSubmitted = false;

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
}
