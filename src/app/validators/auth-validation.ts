import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const nameValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value && control.value.length >= 2
    ? null
    : { nameLength: 'Name must be at least 2 characters long' };
};

export const emailValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(control.value)
    ? null
    : { emailFormat: 'Please enter a valid email address' };
};

export const minLengthValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value && control.value.length >= 6
    ? null
    : { minLength: 'Password must be at least 6 characters long' };
};

export const uppercaseValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return /[A-Z]/.test(control.value)
    ? null
    : { uppercase: 'Password must contain at least one uppercase letter' };
};

export const specialCharValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return /[\W_]/.test(control.value)
    ? null
    : { specialChar: 'Password must contain at least one special character' };
};
