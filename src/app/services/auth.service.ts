import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { RoutingConstants } from '../constants/routes.constants';
import { ApiConstants } from '../constants/api.constants';

declare global {
  interface Window {
    google: any;
    FB: any;
    fbAsyncInit: () => void;
  }
}
export {};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = `${environment.apiUrl}/${ApiConstants.AUTH}`;

  constructor(private http: HttpClient) {
    this.loadFacebookSDK();
  }

  signup(data: {
    name: string;
    email: string;
    password: string;
  }): Observable<string> {
    return this.http
      .post<string>(`${this.authUrl}/${RoutingConstants.SIGNUP}`, data)
      .pipe(
        tap(response => {
          this.setToken(response);
        })
      );
  }

  login(data: { email: string; password: string }): Observable<string> {
    return this.http
      .post<string>(`${this.authUrl}/${RoutingConstants.LOGIN}`, data)
      .pipe(
        tap(response => {
          this.setToken(response);
        })
      );
  }

  loginWithGoogle(googleToken: string): Observable<string> {
    return this.http
      .post<string>(`${this.authUrl}/${ApiConstants.GOOGLE}`, {
        token: googleToken,
      })
      .pipe(
        tap(response => {
          this.setToken(response);
        })
      );
  }

  async loginWithFacebook(): Promise<string> {
    await this.ensureFacebookSDKLoaded();

    return new Promise((resolve, reject) => {
      window.FB.login(
        (response: any) => {
          if (response.authResponse) {
            resolve(response.authResponse.accessToken);
          } else {
            reject('User cancelled login or did not fully authorize.');
          }
        },
        { scope: 'email,public_profile' }
      );
    });
  }

  sendFacebookTokenToBackend(token: string): Observable<string> {
    return this.http
      .post<string>(`${this.authUrl}/${ApiConstants.FACEBOOK}`, { token })
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

  private loadFacebookSDK() {
    if ((window as any).FB) {
      console.log('Facebook SDK already loaded.');
      return;
    }
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: environment.facebookAppId,
        cookie: true,
        xfbml: true,
        version: 'v17.0',
      });
    };
    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    script.onload = () => console.log('Facebook SDK script loaded.');
    document.body.appendChild(script);
  }

  private async ensureFacebookSDKLoaded(): Promise<void> {
    if (window.FB) return;
    return new Promise<void>(resolve => {
      const checkFB = setInterval(() => {
        if (window.FB) {
          clearInterval(checkFB);
          resolve();
        }
      }, 100);
    });
  }
}
