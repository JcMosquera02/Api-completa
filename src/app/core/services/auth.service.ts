import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_URL = environment.apiUrl;
  private readonly TOKEN_KEY = 'accessToken';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(`${this.API_URL}/auth/login`, { email, password }).pipe(
      tap((res: any) => {
        this.setTokens(res.accessToken, res.refreshToken);
      })
    );
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.API_URL}/auth/register`, { name, email, password }).pipe(
      tap((res: any) => {
        this.setTokens(res.accessToken, res.refreshToken);
      })
    );
  }

  refreshToken() {
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    return this.http.post(`${this.API_URL}/auth/refresh`, { refreshToken }).pipe(
      tap((res: any) => {
        this.setTokens(res.accessToken, res.refreshToken);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }
}