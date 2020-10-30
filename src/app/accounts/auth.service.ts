import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthUser } from './auth-user.model';
import { Router } from '@angular/router';
import { User } from './user.model';

import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
const baseUrl = `${environment.apiUrl}/users`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUserSubject: BehaviorSubject<AuthUser>;
  authUser$: Observable<AuthUser>;

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {
    this.authUserSubject = new BehaviorSubject<AuthUser>((JSON.parse(localStorage.getItem('userData'))));
    this.authUser$ = this.authUserSubject.asObservable();
  }

  getToken() {
    return this.authUserSubject.value ? this.authUserSubject.getValue().token : null;
  }

  signUp(user: User) {
    return this.http.post(
      `${baseUrl}/signup`, user)
      .pipe(map(response => {
        let user: AuthUser = {
          username: response['username'],
          token: response['token']
        }
        localStorage.setItem('usrname', user.username);
        localStorage.setItem('token', user.token);
        this.authUserSubject.next(user);

        return response;
      }));
  }

  signIn(email: string, password: string) {
    return this.http.post(
      `${baseUrl}/signin`, {
        email: email,
        password: password
      })
      .pipe(map(response => {
        let user: AuthUser = {
          username: response['username'],
          token: response['token']
        }
        localStorage.setItem('usrname', user.username);
        localStorage.setItem('token', user.token);
        this.authUserSubject.next(user);
        this.snackBar.open('Successfully logged in');

        return response;
      }));
  }

  signOut() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this.authUserSubject.next(null);
    this.snackBar.open('Successfully logged out');
    this.router.navigate(['/accounts/signin']);
  }
}
