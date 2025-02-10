import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { RoutingConstants } from '../constants/routes.constants';
import { ApiConstants } from '../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private googleUrl = `${environment.apiUrl}/${ApiConstants.AUTH}`;

  constructor(private http: HttpClient) {}

  signup(data: {
    name: string;
    email: string;
    password: string;
  }): Observable<string> {
    return this.http
      .post<string>(`${this.googleUrl}/${RoutingConstants.SIGNUP}`, data)
      .pipe(
        tap(response => {
          this.setToken(response);
        })
      );
  }

  login(data: { email: string; password: string }): Observable<string> {
    return this.http
      .post<string>(`${this.googleUrl}/${RoutingConstants.LOGIN}`, data)
      .pipe(
        tap(response => {
          this.setToken(response);
        })
      );
  }

  loginWithGoogle(googleToken: string): Observable<string> {
    return this.http
      .post<string>(`${this.googleUrl}/${ApiConstants.GOOGLE}`, {
        token: googleToken,
      })
      .pipe(
        tap(response => {
          this.setToken(response);
        })
      );
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  logout(): void {
    window.google.accounts.id.disableAutoSelect();
    localStorage.removeItem('token');
    console.log('User logged out.');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
