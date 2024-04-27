import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { LoginResult } from './login-result';
import { LoginRequest } from './login-request';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public tokenKey: string = "tokenKey";

  constructor(protected http: HttpClient) {
  }

  login(loginRequest: LoginRequest): Observable<LoginResult> {
    const url = `${environment.baseUrl}Admin/Login`;
    return this.http.post<LoginResult>(url, loginRequest)
      .pipe(tap(loginResult => {
        if (loginResult.success) {
          localStorage.setItem(this.tokenKey, loginResult.token)
        }
      }));
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
