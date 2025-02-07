import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { RoutingConstants } from '../constants/routes.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/${RoutingConstants.AUTH}`;

  constructor(private http: HttpClient) {}

  signup(data: {
    name: string;
    email: string;
    password: string;
  }): Observable<string> {
    return this.http
      .post<string>(`${this.apiUrl}/${RoutingConstants.SIGNUP}`, data)
      .pipe(
        tap(response => {
          this.setToken(response);
        })
      );
  }

  login(data: { email: string; password: string }): Observable<string> {
    return this.http
      .post<string>(`${this.apiUrl}/${RoutingConstants.LOGIN}`, data)
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
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
