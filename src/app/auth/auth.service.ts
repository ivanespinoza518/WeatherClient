import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { LoginResult } from './login-result';
import { LoginRequest } from './login-request';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public tokenKey: string = "tokenKey";
  private _authStatus = new BehaviorSubject<boolean>(false);
  public authStatus = this._authStatus.asObservable();

  constructor(protected http: HttpClient) {
  }

  init(): void {
    if (this.isAuthenticated())
      this.setAuthStatus(true);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  login(loginRequest: LoginRequest): Observable<LoginResult> {
    const url = `${environment.baseUrl}Admin/Login`;
    return this.http.post<LoginResult>(url, loginRequest)
      .pipe(tap(loginResult => {
        if (loginResult.success) {
          localStorage.setItem(this.tokenKey, loginResult.token)
          this.setAuthStatus(true);
        }
      }));
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.setAuthStatus(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setAuthStatus(isAuthenticated: boolean): void {
    this._authStatus.next(isAuthenticated);
  }
}
