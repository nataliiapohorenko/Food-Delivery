import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'validationError',
  standalone: true,
  pure: false,
})
export class ValidationError implements PipeTransform {
  transform(control: AbstractControl | null): string | null {
    if (!control || !control.errors) return null;

    const errorMessages: Record<string, string> = {
      required: 'This field is required',
      nameLength: 'Name must be at least 2 characters long',
      emailFormat: 'Please enter a valid email address',
      minLength: 'Password must be at least 6 characters long',
      uppercase: 'Password must contain at least one uppercase letter',
      specialChar: 'Password must contain at least one special character',
    };

    return (
      Object.keys(control.errors)
        .map(key => errorMessages[key])
        .find(message => !!message) || null
    );
  }
}
