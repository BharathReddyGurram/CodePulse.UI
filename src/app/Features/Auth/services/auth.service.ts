import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  token: string;
  expiresAt: string;
  role: 'SuperAdmin' | 'Manager' | 'User';
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  userId?: string;
}

export interface AuthResponse {
  token: string;
  expiresAt: string;
  role: 'SuperAdmin' | 'Manager' | 'User';
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private tokenKey = 'auth_token';
  private roleKey = 'auth_role';

  constructor(private http: HttpClient) {}

  register(userData: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${environment.apiBaseUrl}/api/Auth/register`, userData);
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiBaseUrl}/api/Auth/login`, { email, password })
      .pipe(
        tap(res => {
          localStorage.setItem(this.tokenKey, res.token);
          localStorage.setItem(this.roleKey, res.role);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRole(): 'SuperAdmin' | 'Manager' | 'User' | null {
    return localStorage.getItem(this.roleKey) as any;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  loginSuccess(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }
 
  
}
